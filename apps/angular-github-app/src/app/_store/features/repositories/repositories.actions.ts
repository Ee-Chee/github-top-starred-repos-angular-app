import { createAction, props } from '@ngrx/store';
import { ResponseErrorInterface } from '@angular-leanix/common';
import { Repo } from './repositories.model';

export const loadingPaginatedRepos = createAction(
  '[Repositories/API] Loading Paginated Repos'
);

export const requestPaginatedRepos = createAction(
  '[Repositories/API] Request Paginated Repos',
  props<{ after: string }>()
);

export const setPaginatedRepos = createAction(
  '[Repositories/API] Set Paginated Repos',
  props<{ after: string | null; repos: Repo[]; mapKey: string }>()
);

export const requestPaginatedReposFailure = createAction(
  '[Repositories/API] Request Paginated Repos Failure',
  props<{ error: ResponseErrorInterface }>()
);

export const navigatePaginatedReposPage = createAction(
  '[Repositories] Navigate PaginatedRepos Page',
  props<{ page: string }>()
);
