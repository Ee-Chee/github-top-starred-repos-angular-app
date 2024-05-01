import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as RepositoryActions from './repository.actions';
import { RepositoryEntity, RepositoryState } from './repository.models';

export const REPOSITORY_FEATURE_KEY = 'repository';

export const repositoryAdapter: EntityAdapter<RepositoryEntity> =
  createEntityAdapter<RepositoryEntity>({
    selectId: (repo) => repo.nameWithOwner,
  });

export const initialRepositoryState: RepositoryState =
  repositoryAdapter.getInitialState({
    loading: false,
    error: null,
  });

const reducer = createReducer(
  initialRepositoryState,
  on(RepositoryActions.loadingRepo, (state) => ({
    ...state,
    loading: true,
  })),
  on(RepositoryActions.setRepo, (state, { repository, mapKey }) => {
    const newMap = new Map(state.entities[repository.nameWithOwner]?.issuesMap);
    const repoData: RepositoryEntity = {
      ...repository,
      currentPage: mapKey,
      after: repository.issues.pageInfo?.hasNextPage
        ? repository.issues.pageInfo?.endCursor
        : null,
      issuesMap: newMap.set(mapKey, repository.issues.nodes ?? []),
    };

    return repositoryAdapter.setOne(repoData, { ...state, loading: false });
  }),
  on(RepositoryActions.setRepoError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(RepositoryActions.navigateRepoPage, (state, { page, ownerName }) =>
    repositoryAdapter.updateOne(
      {
        id: ownerName,
        changes: { currentPage: page },
      },
      { ...state, loading: false }
    )
  )
);

export function repositoryReducer(
  state: RepositoryState | undefined,
  action: Action
) {
  return reducer(state, action);
}
