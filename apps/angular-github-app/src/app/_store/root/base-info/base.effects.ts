import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, mergeMap } from 'rxjs';
import * as BaseActions from './base.actions';
import { BaseService } from './base.service';
import { ApolloError } from '@apollo/client';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseError } from '@angular-leanix/common';
import { Router } from '@angular/router';

@Injectable()
export class BaseEffects {
  private actions$ = inject(Actions);
  private baseService = inject(BaseService);
  private router = inject(Router);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BaseActions.validateToken),
      mergeMap((action) =>
        this.baseService.validatePersonalToken(action.token).pipe(
          map((token) => {
            this.router.navigateByUrl('/repositories');

            return BaseActions.validationSuccess({ token });
          }),
          catchError((errorResp: ApolloError) => {
            let error: ResponseError;

            if (errorResp.networkError instanceof HttpErrorResponse) {
              error = {
                message: errorResp.networkError.message,
                statusCode: errorResp.networkError.status,
              };
            } else {
              error = {
                message: errorResp.message,
              };
            }

            return of(BaseActions.validationFailure({ error }));
          })
        )
      )
    )
  );
}
