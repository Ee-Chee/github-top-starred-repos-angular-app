import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of } from 'rxjs';

import * as RepositoryActions from '../repository/repository.actions';
import { RepositoryService } from './repository.service';
import { ApolloError } from '@apollo/client';
import { ResponseErrorInterface } from '@angular-leanix/common';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class RepositoryEffects {
  private actions$ = inject(Actions);
  private repositoryService = inject(RepositoryService);

  getRepo = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoryActions.requestRepo),
      mergeMap((action) =>
        this.repositoryService
          .requestRepo(action.owner, action.name, action.after)
          .pipe(
            map((response) =>
              RepositoryActions.setRepo({
                repository: response.data.repository,
                mapKey: action.after,
              })
            ),
            catchError((errorResp: ApolloError) => {
              let error: ResponseErrorInterface;

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

              return of(RepositoryActions.setRepoError({ error }));
            })
          )
      )
    )
  );
}
