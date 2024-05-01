import { firstReposEntryPage, RepositoriesState } from './repositories.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as RepositoriesActions from '../../features/repositories/repositories.actions';

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
  on(RepositoriesActions.requestPaginatedReposFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(RepositoriesActions.navigatePaginatedReposPage, (state, { page }) => ({
    ...state,
    currentPage: page,
  }))
);

export function repositoriesReducer(
  state: RepositoriesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
