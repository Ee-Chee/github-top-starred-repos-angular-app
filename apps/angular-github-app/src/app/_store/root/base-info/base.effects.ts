import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as BaseActions from './base.actions';
import { BaseService } from './base.service';

@Injectable()
export class BaseEffects {
  private actions$ = inject(Actions);
  private baseService = inject(BaseService);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BaseActions.validateToken),
      switchMap((action) =>
        this.baseService
          .validatePersonalToken(action.token)
          .pipe(map((token) => BaseActions.validationSuccess({ token })))
      ),
      catchError((error) => {
        return of(BaseActions.validationFailure({ error }));
      })
    )
  );
}
