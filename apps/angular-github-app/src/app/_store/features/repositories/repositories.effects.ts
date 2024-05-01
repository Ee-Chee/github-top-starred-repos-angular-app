import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { catchError, of, map, mergeMap } from 'rxjs';
import * as RepositoriesActions from './repositories.actions';
import { RepositoriesService } from './repositories.service';
import { ApolloError } from '@apollo/client';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseErrorInterface } from '@angular-leanix/common';

@Injectable()
export class RepositoriesEffects {
  private actions$ = inject(Actions);
  private repositoriesService = inject(RepositoriesService);

  getRepos = createEffect(() =>
    this.actions$.pipe(
      ofType(RepositoriesActions.requestPaginatedRepos),
      mergeMap((action) =>
        this.repositoriesService.requestPaginatedRepos(action.after).pipe(
          map((response) => {
            const data = response!.data.search;
            return RepositoriesActions.setPaginatedRepos({
              after: data.pageInfo.hasNextPage ? data.pageInfo.endCursor : null,
              repos: data.nodes,
              mapKey: action.after,
            });
          }),
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

            return of(RepositoriesActions.setPaginatedReposError({ error }));
          })
        )
      )
    )
  );
}
