import { createFeatureSelector, createSelector } from '@ngrx/store';
import { REPOSITORIES_KEY } from './repositories.reducer';
import { RepositoriesState } from './repositories.model';

export const selectRepositoriesState =
  createFeatureSelector<RepositoriesState>(REPOSITORIES_KEY);

export const selectRepositoriesLoading = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.loading
);

export const selectRepositoriesError = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.error
);

/////////////////////////

export const selectReposMap = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.paginatedReposMap
);

export const selectReposCurrentPage = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.currentPage
);

export const selectReposAfter = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.after
);

export const selectRepositoriesData = createSelector(
  selectReposMap,
  selectReposCurrentPage,
  selectReposAfter,
  (reposMap, currentPage, after) => {
    return {
      reposMap: reposMap,
      currentPage: currentPage,
      after: after,
    };
  }
);
