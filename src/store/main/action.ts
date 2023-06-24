import { createActionTypes, createApiActions } from '../rootActions';

import {
  GetAppointmentsResponse,
  ClearDBResponse,
  PayloadSendData,
  ResultSendData,
} from './types';

export const sendDataAction = createApiActions<PayloadSendData, ResultSendData>(
  createActionTypes('SEND_DATA'),
);

export const clearDBAction = createApiActions<any, ClearDBResponse>(
  createActionTypes('CLEAR_DB'),
);

export const getAppointmentsAction = createApiActions<
  any,
  GetAppointmentsResponse
>(createActionTypes('GET_APPOINTMENTS'));

export const applyAppointmentsAction = createApiActions(
  createActionTypes('APPLY_APPOINTMENTS'),
);
