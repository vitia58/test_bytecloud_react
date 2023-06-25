import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  applyAppointmentsAction,
  getAppointmentsAction,
} from '../../store/main';
import { useTypedSelector } from '../../store/store';
import {
  AppointmentFullEntity,
  GetAppointmentsResponse,
} from '../../store/main/types';
import { Status } from '../../common/status.enum';
import { doctorTransforms, patientTransforms } from '../../common/transforms';
import { ModalCloseButton, ModalContent, ModalOverlay } from '../../components';
import { io } from 'socket.io-client';
import { default_api } from '../../common/api.constants';
import {
  ApplyButton,
  Button,
  PageContainer,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
} from './styled';

const statusColorTable: { [t in Status]: string } = {
  [Status.GREEN]: 'lawngreen',
  [Status.YELLOW]: 'yellow',
  [Status.BLUE]: 'lightskyblue',
  [Status.RED]: 'orangered',
};

const numbersWords = [
  null,
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
];

const ProcessPage: React.FC = () => {
  const dispatch = useDispatch();

  const [modalData, setModalData] = useState<AppointmentFullEntity | null>(
    null,
  );

  const appointments = useTypedSelector((s) => s.main.appointments);

  useEffect(() => {
    dispatch(getAppointmentsAction.request({}));
  }, []);

  useEffect(() => {
    const socket = io('/');

    socket.on('appointment', (data: GetAppointmentsResponse) => {
      console.log(data);
      dispatch(getAppointmentsAction.success(data));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const apply = () => {
    dispatch(applyAppointmentsAction.request({}));
  };

  const openModal = (data: AppointmentFullEntity) => {
    setModalData(data);
  };

  const closeModal = () => {
    setModalData(null);
  };

  const afterResult = (appointments?.modifiedAppointment ?? []).reduce(
    (prev, { status }) => ({ ...prev, [status]: prev[status] + 1 }),
    {
      [Status.GREEN]: 0,
      [Status.BLUE]: 0,
      [Status.YELLOW]: 0,
      [Status.RED]: 0,
    } as Record<Status, number>,
  )!;

  const resultMapped = (Object.keys(afterResult) as Status[])
    .filter((status) => afterResult[status] > 0)
    .map(
      (status) =>
        `${
          numbersWords[afterResult[status]] ?? afterResult[status]
        } ${status} appointment${afterResult[status] > 1 ? 's' : ''}. `,
    )
    .join('');

  return appointments ? (
    <PageContainer>
      <TableContainer>
        <Table>
          <thead>
            <tr>
              <TableHeader colSpan={4}>Before change</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Patient id</TableCell>
              <TableCell>Doctor id</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>About</TableCell>
            </tr>
            {appointments?.appointments.map((appointment, index) => (
              <tr
                key={`${index}_before`}
                style={{
                  backgroundColor: statusColorTable[appointment.status],
                }}
              >
                <TableCell>{appointment.idPatient}</TableCell>
                <TableCell>{appointment.idDoctor}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(appointment)}>View</Button>
                </TableCell>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <br />
              </td>
            </tr>
          </tfoot>
        </Table>

        <Table>
          <thead>
            <tr>
              <TableHeader colSpan={4}>After change</TableHeader>
            </tr>
          </thead>
          <tbody>
            <tr>
              <TableCell>Patient id</TableCell>
              <TableCell>Doctor id</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>About</TableCell>
            </tr>
            {appointments?.modifiedAppointment.map((appointment, index) => (
              <tr
                key={`${index}_after`}
                style={{
                  backgroundColor: statusColorTable[appointment.status],
                }}
              >
                <TableCell>{appointment.idPatient}</TableCell>
                <TableCell>{appointment.idDoctor}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Button onClick={() => openModal(appointment)}>View</Button>
                </TableCell>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>{resultMapped}</td>
            </tr>
          </tfoot>
        </Table>
      </TableContainer>

      {modalData ? (
        <ModalOverlay>
          <ModalContent>
            <h2>About appointment:</h2>
            <p>Patient: {patientTransforms.toString(modalData?.patient!)}</p>
            <p>Doctor: {doctorTransforms.toString(modalData?.doctor!)}</p>
            <p>Appointment: {modalData?.time}</p>
            <ModalCloseButton onClick={closeModal}>X</ModalCloseButton>
          </ModalContent>
        </ModalOverlay>
      ) : (
        <></>
      )}
      <ApplyButton onClick={apply}>Apply</ApplyButton>
    </PageContainer>
  ) : (
    <></>
  );
};

export default ProcessPage;
