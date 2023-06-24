import { Status } from '../../common/status.enum';

export type TInitialState = {
  modalSendData: ResultSendData | null;
  modalClearDB: ClearDBResponse | null;
  appointments: GetAppointmentsResponse | null;
};

export type PersonEntity = {
  id: number;
  time: {
    from: number;
    to: number;
  };
  name?: string;
  birthday?: Date;
};

export type AppointmentEntity = {
  idDoctor: number;
  idPatient: number;
  time?: number;
};

type SubResultSendData = {
  success: string[];
  wrong: string[];
  duplicates: string[];
};

export type ResultSendData = {
  patients: SubResultSendData;
  doctors: SubResultSendData;
  appointments: Omit<SubResultSendData, 'duplicates'>;
};

export type PayloadSendData = {
  [K in keyof ResultSendData]: string[];
};

export type SendDataResponses<
  T extends string,
  K extends PersonEntity | AppointmentEntity,
> = {
  errors: {
    entity: K;
    error: string;
  }[];
} & Record<
  T,
  {
    entity: K;
    error: string;
  }[]
>;

export type ClearDBResponse = {
  count: number;
};

export type AppointmentFullEntity = AppointmentEntity & {
  status: Status;
  patient: PersonEntity;
  doctor: PersonEntity;
};

export type GetAppointmentsResponse = {
  modifiedAppointment: AppointmentFullEntity[];
  appointments: AppointmentFullEntity[];
};
