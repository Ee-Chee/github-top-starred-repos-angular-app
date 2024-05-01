import { createFeatureSelector, createSelector } from '@ngrx/store';
import { REPOSITORIES_KEY } from './repositories.reducer';
import { RepositoriesState } from './repositories.model';

export const selectRepositoriesState =
  createFeatureSelector<RepositoriesState>(REPOSITORIES_KEY);

export const selectRepositoriesLoading = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.loading
);

export const selectRepositoriesMap = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.paginatedReposMap
);

export const selectRepositoriesError = createSelector(
  selectRepositoriesState,
  (state: RepositoriesState) => state.error
);
