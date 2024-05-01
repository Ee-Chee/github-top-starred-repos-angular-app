import { inject, Injectable } from '@angular/core';
import { GET_REPO_ISSUES } from '../../../graphql.queries';
import { Observable, switchMap, take } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../root/base-info/base.selectors';
import { ApolloQueryResult } from '@apollo/client';
import { firstRepoIssuesPage, RepoDetail } from './repository.models';
import { loadingRepo } from './repository.actions';
import { Repository } from '@angular-leanix/common';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  private apollo = inject(Apollo);
  private store = inject(Store);

  requestRepo(
    owner: string,
    name: string,
    after: string
  ): Observable<ApolloQueryResult<Repository<RepoDetail>>> {
    this.store.dispatch(loadingRepo());

    return this.store.select(selectAccessToken).pipe(
      take(1),
      switchMap((token) => {
        return this.apollo.query<Repository<RepoDetail>>({
          query: GET_REPO_ISSUES,
          fetchPolicy: 'no-cache',
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: {
            owner: owner,
            name: name,
            after: after === firstRepoIssuesPage ? null : after,
          },
        });
      })
    );
  }
}
