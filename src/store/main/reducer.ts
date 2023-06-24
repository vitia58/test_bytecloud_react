import { createReducer } from '@reduxjs/toolkit';
import { TInitialState } from './types';
import { clearDBAction, getAppointmentsAction, sendDataAction } from './action';

const InitialState: TInitialState = {
  modalSendData: null,
  modalClearDB: null,
  appointments: null,
};

export const profileReducer = createReducer<TInitialState>(
  InitialState,
  (builder) => {
    builder.addCase(sendDataAction.success, (state, { payload }) => ({
      ...state,
      modalSendData: payload,
    }));

    builder.addCase(sendDataAction.clear, (state, {}) => ({
      ...state,
      modalSendData: null,
    }));

    builder.addCase(clearDBAction.success, (state, { payload }) => ({
      ...state,
      modalClearDB: payload,
    }));

    builder.addCase(clearDBAction.clear, (state, {}) => ({
      ...state,
      modalClearDB: null,
    }));

    builder.addCase(getAppointmentsAction.success, (state, { payload }) => ({
      ...state,
      appointments: payload,
    }));
  },
);
