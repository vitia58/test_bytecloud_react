import { createAction } from '@reduxjs/toolkit';

export const createActionTypes = (action: string) => ({
  REQUEST: `${action.toUpperCase()}_REQUEST`,
  SUCCESS: `${action.toUpperCase()}_SUCCESS`,
  FAILURE: `${action.toUpperCase()}_FAILURE`,
  CLEAR: `${action.toUpperCase()}_CLEAR`,
});

/**
 *
 * @typeParam R the request payload type
 * @typeParam S the success payload type
 * @typeParam F the failure payload type
 */

export const createApiActions = <R = any, S = any, F = any, C = any>(
  actionTypes: ReturnType<typeof createActionTypes>,
) => ({
  request: createAction<R>(actionTypes.REQUEST),
  success: createAction<S>(actionTypes.SUCCESS),
  failure: createAction<F>(actionTypes.FAILURE),
  clear: createAction<C>(actionTypes.CLEAR),
});

export type createActionTypes = typeof createActionTypes;
export type createApiActions = typeof createApiActions;
