import { createReducer, on, Action } from '@ngrx/store';

import * as BaseActions from './base.actions';
import { BaseState } from './base.models';

export const BASE_KEY = 'base';

const initialState: BaseState = {
  accessToken: null,
  error: null,
};

const reducer = createReducer(
  initialState,
  on(BaseActions.validationSuccess, (state, { token }) => ({
    ...state,
    accessToken: token,
    error: null,
  })),
  on(BaseActions.validationFailure, (state, { error }) => ({
    ...state,
    error,
    accessToken: null,
  }))
);

export function baseReducer(state: BaseState | undefined, action: Action) {
  return reducer(state, action);
}
