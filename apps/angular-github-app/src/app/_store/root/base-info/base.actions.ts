import { createAction, props } from '@ngrx/store';
import { ResponseErrorInterface } from '@angular-leanix/common';

export const validateToken = createAction(
  '[Base/API] Validate token',
  props<{ token: string }>()
);

export const validationSuccess = createAction(
  '[Base/API] Validation Success',
  props<{ token: string }>()
);

export const validationFailure = createAction(
  '[Base/API] Validation Failure',
  props<{ error: ResponseErrorInterface }>()
);

export const resetStore = createAction('[Base] Reset Store');
