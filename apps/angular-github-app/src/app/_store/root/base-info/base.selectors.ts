import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BASE_KEY } from './base.reducer';
import { BaseState } from './base.models';

export const selectBaseState = createFeatureSelector<BaseState>(BASE_KEY);

export const selectAccessToken = createSelector(
  selectBaseState,
  (state: BaseState) => state.accessToken
);

export const selectError = createSelector(
  selectBaseState,
  (state: BaseState) => state.error
);
