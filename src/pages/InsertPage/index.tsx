import React, { useEffect, useState } from 'react';
import {
  Button,
  ButtonsContainer,
  Column,
  Container,
  Heading,
  Row,
  Textarea,
} from './styled';
import ModalRow from './components/ModalRow';
import { useDispatch } from 'react-redux';
import { clearDBAction, sendDataAction } from '../../store/main';
import { useTypedSelector } from '../../store/store';
import { ModalCloseButton, ModalContent, ModalOverlay } from '../../components';

type FormData = {
  patientsData: string;
  doctorsData: string;
  appointmentsData: string;
};

const InsertPage: React.FC = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    patientsData: '',
    doctorsData: '',
    appointmentsData: '',
  });

  const modalSendData = useTypedSelector((s) => s.main.modalSendData);
  const modalClearDB = useTypedSelector((s) => s.main.modalClearDB);

  useEffect(() => {
    return () => {
      dispatch(sendDataAction.clear({}));
      dispatch(clearDBAction.clear({}));
    };
  }, []);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: keyof FormData,
  ) => {
    const { value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSendData = () => {
    if (
      formData.patientsData ||
      formData.doctorsData ||
      formData.appointmentsData
    ) {
      dispatch(
        sendDataAction.request({
          patients: formData.patientsData.split('\n').filter((line) => line),
          doctors: formData.doctorsData.split('\n').filter((line) => line),
          appointments: formData.appointmentsData
            .split('\n')
            .filter((line) => line),
        }),
      );
      setFormData({
        patientsData: '',
        doctorsData: '',
        appointmentsData: '',
      });
    }
  };

  const handleClearDB = () => {
    dispatch(clearDBAction.request({}));
  };

  const closeModal = () => {
    if (modalSendData) dispatch(sendDataAction.clear({}));
    if (modalClearDB) dispatch(clearDBAction.clear({}));
  };

  return (
    <Container>
      <Row>
        <Column>
          <Heading>Patients</Heading>
          <Textarea
            rows={15}
            value={formData.patientsData}
            onChange={(e) => handleInputChange(e, 'patientsData')}
          />
        </Column>

        <Column>
          <Heading>Doctors</Heading>
          <Textarea
            rows={15}
            value={formData.doctorsData}
            onChange={(e) => handleInputChange(e, 'doctorsData')}
          />
        </Column>

        <Column>
          <Heading>Appointments</Heading>
          <Textarea
            rows={15}
            value={formData.appointmentsData}
            onChange={(e) => handleInputChange(e, 'appointmentsData')}
          />
        </Column>
      </Row>

      <ButtonsContainer>
        <Button onClick={handleSendData}>Send Data</Button>
        <Button onClick={handleClearDB}>Clear DB</Button>
      </ButtonsContainer>

      {modalSendData != null && (
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
            <ModalRow
              name="Successful Patients"
              lines={modalSendData.patients.success}
            />
            <ModalRow
              name="Successful Doctors"
              lines={modalSendData.doctors.success}
            />
            <ModalRow
              name="Successful Appointments"
              lines={modalSendData.appointments.success}
            />
            <ModalRow
              name="Wrong Format Patients"
              lines={modalSendData.patients.wrong}
            />
            <ModalRow
              name="Wrong Format Doctors"
              lines={modalSendData.doctors.wrong}
            />
            <ModalRow
              name="Wrong Format Appointments"
              lines={modalSendData.appointments.wrong}
            />
            <ModalRow
              name="Duplicates Patients"
              lines={modalSendData.patients.duplicates}
            />
            <ModalRow
              name="Duplicates Doctors"
              lines={modalSendData.doctors.duplicates}
            />
          </ModalContent>
        </ModalOverlay>
      )}
      {modalClearDB != null ? (
        <ModalOverlay>
          <ModalContent>
            <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
            <ModalRow
              name="Deleted count"
              lines={[modalClearDB.count.toString()]}
            />
          </ModalContent>
        </ModalOverlay>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default InsertPage;
