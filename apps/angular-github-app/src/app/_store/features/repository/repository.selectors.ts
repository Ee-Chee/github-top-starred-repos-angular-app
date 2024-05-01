import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  REPOSITORY_FEATURE_KEY,
  repositoryAdapter,
} from './repository.reducer';
import { RepositoryState } from './repository.models';

// Lookup the 'Repository' feature state managed by NgRx
export const selectRepositoryState = createFeatureSelector<RepositoryState>(
  REPOSITORY_FEATURE_KEY
);

const { selectAll, selectEntities } = repositoryAdapter.getSelectors();

export const selectRepositoryLoading = createSelector(
  selectRepositoryState,
  (state: RepositoryState) => state.loading
);

export const selectRepositoryError = createSelector(
  selectRepositoryState,
  (state: RepositoryState) => state.error
);

////////////////////////

export const selectAllRepository = createSelector(
  selectRepositoryState,
  (state: RepositoryState) => selectAll(state)
);

export const selectRepositoryEntities = createSelector(
  selectRepositoryState,
  (state: RepositoryState) => selectEntities(state)
);
