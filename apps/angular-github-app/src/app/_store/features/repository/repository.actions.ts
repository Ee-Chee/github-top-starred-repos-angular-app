import { createAction, props } from '@ngrx/store';
import { RepoDetail } from './repository.models';
import { ResponseErrorInterface } from '@angular-leanix/common';

export const loadingRepo = createAction('[Repo/API] Loading Repo');

export const requestRepo = createAction(
  '[Repo/API] Request Repo',
  props<{ owner: string; name: string; after: string }>()
);

export const setRepo = createAction(
  '[Repo/API] Set Repo',
  props<{ repository: RepoDetail; mapKey: string }>()
);

export const setRepoError = createAction(
  '[Repo/API] Set Repo Error',
  props<{ error: ResponseErrorInterface | null }>()
);

export const navigateRepoPage = createAction(
  '[Repo] Navigate Repo Page',
  props<{ page: string; ownerName: string }>()
);
