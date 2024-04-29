import { createAction, props } from '@ngrx/store';

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
  props<{ error: string }>()
);
