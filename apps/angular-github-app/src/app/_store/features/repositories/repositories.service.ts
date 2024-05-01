import { inject, Injectable } from '@angular/core';
import {
  GET_PAGINATED_REPOSITORIES,
  GET_REPO_ISSUES,
} from '../../../graphql.queries';
import { map, Observable, switchMap, take } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../../root/base-info/base.selectors';
import { firstReposEntryPage, Repo } from './repositories.model';
import { ApolloQueryResult } from '@apollo/client';
import { loadingPaginatedRepos } from './repositories.actions';
import { Search } from '@angular-leanix/common';

@Injectable({
  providedIn: 'root',
})
export class RepositoriesService {
  private apollo = inject(Apollo);
  private store = inject(Store);

  requestPaginatedRepos(
    after: string
  ): Observable<ApolloQueryResult<Search<Repo[]>>> {
    // https://docs.github.com/en/search-github/getting-started-with-searching-on-github/troubleshooting-search-queries
    // search for repos which have at least one star
    // due to millions of entries (timeout querying) => inconsistent results
    this.store.dispatch(loadingPaginatedRepos());

    return this.store.select(selectAccessToken).pipe(
      take(1),
      switchMap((token) => {
        return this.apollo.query<Search<Repo[]>>({
          query: GET_REPO_ISSUES,
          fetchPolicy: 'no-cache',
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: {
            owner: 'freeCodeCamp',
            name: 'freeCodeCamp',
          },
        });
      })
    );

    return this.store.select(selectAccessToken).pipe(
      take(1),
      switchMap((token) => {
        return this.apollo.query<Search<Repo[]>>({
          query: GET_PAGINATED_REPOSITORIES,
          fetchPolicy: 'no-cache',
          context: {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          variables: {
            query: 'is:public sort:stars stars:>0',
            after: after === firstReposEntryPage ? null : after,
          },
        });
      })
    );
  }
}
