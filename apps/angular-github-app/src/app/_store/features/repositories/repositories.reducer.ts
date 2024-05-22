import { firstReposEntryPage, RepositoriesState } from './repositories.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as RepositoriesActions from '../../features/repositories/repositories.actions';
import { resetStore } from '../../root/base-info/base.actions';

export const REPOSITORIES_KEY = 'repositories';

const initialState: RepositoriesState = {
  paginatedReposMap: new Map(),
  after: null,
  error: null,
  loading: false,
  currentPage: firstReposEntryPage,
};

const reducer = createReducer(
  initialState,
  on(RepositoriesActions.loadingPaginatedRepos, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    RepositoriesActions.setPaginatedRepos,
    (state, { repos, after, mapKey }) => {
      const newMap = new Map(state.paginatedReposMap);

      return {
        ...state,
        loading: false,
        paginatedReposMap: newMap.set(mapKey, repos),
        after,
        currentPage: mapKey,
      };
    }
  ),
  on(RepositoriesActions.setPaginatedReposError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(RepositoriesActions.navigatePaginatedReposPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  })),
  on(resetStore, (state) => ({
    ...state,
    ...initialState,
  }))
);

export function repositoriesReducer(
  state: RepositoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
