import { takeLatest } from '@redux-saga/core/effects';
import axios from 'axios';
import {
  applyAppointmentsAction,
  clearDBAction,
  getAppointmentsAction,
  sendDataAction,
} from './action';
import { default_api } from '../../common/api.constants';
import {
  AppointmentEntity,
  ClearDBResponse,
  GetAppointmentsResponse,
  PersonEntity,
  ResultSendData,
  SendDataResponses,
} from './types';
import { put } from 'redux-saga/effects';
import {
  appointmentTransforms,
  doctorTransforms,
  patientTransforms,
} from '../../common/transforms';

function* sendDataWorker({
  payload,
}: ReturnType<(typeof sendDataAction)['request']>) {
  const model: ResultSendData = {
    patients: { success: [], wrong: [], duplicates: [] },
    doctors: {
      success: [],
      wrong: [],
      duplicates: [],
    },
    appointments: { success: [], wrong: [] },
  };

  try {
    /* PATIENTS */

    const patients = payload.patients
      .map((patient) => {
        const { value, error } = patientTransforms.toObject(patient);
        console.log(value, error);
        if (error) {
          model.patients.wrong.push(patient);
          return null;
        }
        return value;
      })
      .filter((patient) => patient);

    const patientsResponse: {
      data: SendDataResponses<'patients', PersonEntity>;
    } = yield axios.post(`${default_api}/patients/bulk`, patients);

    console.log(patients);
    console.log(patientsResponse.data);

    model.patients.wrong.push(
      ...patientsResponse.data.errors.map(({ entity }) =>
        patientTransforms.toString(entity),
      ),
    );

    model.patients.duplicates.push(
      ...patientsResponse.data.patients
        .filter(({ error }) => error == 'Duplicate')
        .map(({ entity }) => patientTransforms.toString(entity)),
    );

    model.patients.success.push(
      ...patientsResponse.data.patients
        .filter(({ error }) => !error)
        .map(({ entity }) => patientTransforms.toString(entity)),
    );

    /* DOCTORS */

    const doctors = payload.doctors
      .map((doctor) => {
        const { value, error } = doctorTransforms.toObject(doctor);
        if (error) {
          model.doctors.wrong.push(doctor);
          return null;
        }
        return value;
      })
      .filter((doctor) => doctor);

    const doctorsResponse: {
      data: SendDataResponses<'doctors', PersonEntity>;
    } = yield axios.post(`${default_api}/doctors/bulk`, doctors);

    console.log(doctors);
    console.log(doctorsResponse.data);

    model.doctors.wrong.push(
      ...doctorsResponse.data.errors.map(({ entity }) =>
        doctorTransforms.toString(entity),
      ),
    );

    model.doctors.duplicates.push(
      ...doctorsResponse.data.doctors
        .filter(({ error }) => error == 'Duplicate')
        .map(({ entity }) => doctorTransforms.toString(entity)),
    );

    model.doctors.success.push(
      ...doctorsResponse.data.doctors
        .filter(({ error }) => !error)
        .map(({ entity }) => doctorTransforms.toString(entity)),
    );

    /* APPOINTMENTS */

    const appointments = payload.appointments
      .map((appointment) => {
        const { value, error } = appointmentTransforms.toObject(appointment);
        if (error) {
          model.appointments.wrong.push(appointment);
          return null;
        }
        return value;
      })
      .filter((appointment) => appointment);

    const appointmentsResponse: {
      data: SendDataResponses<'appointments', AppointmentEntity>;
    } = yield axios.post(`${default_api}/appointments/bulk`, appointments);

    console.log(appointments);
    console.log(appointmentsResponse.data);

    model.appointments.wrong.push(
      ...appointmentsResponse.data.errors.map(({ entity }) =>
        appointmentTransforms.toString(entity),
      ),
    );

    model.appointments.success.push(
      ...appointmentsResponse.data.appointments
        .filter(({ error }) => !error)
        .map(({ entity }) => appointmentTransforms.toString(entity)),
    );

    yield put(sendDataAction.success(model));
  } catch (e: any) {
    console.log(e);
    console.log({ ...e });
  }
}

function* clearDBWorker({
  payload: {},
}: ReturnType<(typeof clearDBAction)['request']>) {
  const url = `${default_api}/appointments`;
  console.log(url);
  try {
    const response: { data: ClearDBResponse } = yield axios.delete(url);
    yield put(clearDBAction.success(response.data));
  } catch (e: any) {
    console.log({ ...e });
  }
}

function* getAppointmentsWorker({
  payload: {},
}: ReturnType<(typeof getAppointmentsAction)['request']>) {
  const url = `${default_api}/appointments`;
  console.log(url);
  try {
    const response: { data: GetAppointmentsResponse } = yield axios.get(url);
    yield put(getAppointmentsAction.success(response.data));
  } catch (e: any) {
    console.log({ ...e });
  }
}

function* applyAppointmentsWorker({
  payload: {},
}: ReturnType<(typeof applyAppointmentsAction)['request']>) {
  const url = `${default_api}/appointments`;
  console.log(url);
  try {
    const response: { data: GetAppointmentsResponse } = yield axios.patch(url);
    yield put(applyAppointmentsAction.success(response.data));
  } catch (e: any) {
    console.log({ ...e });
  }
}

export function* profileWatcher() {
  yield takeLatest(sendDataAction.request, sendDataWorker);
  yield takeLatest(clearDBAction.request, clearDBWorker);
  yield takeLatest(getAppointmentsAction.request, getAppointmentsWorker);
  yield takeLatest(applyAppointmentsAction.request, applyAppointmentsWorker);
}
