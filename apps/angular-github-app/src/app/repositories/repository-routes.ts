import { Route } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  REPOSITORIES_KEY,
  repositoriesReducer,
} from '../_store/features/repositories/repositories.reducer';
import { RepositoriesEffects } from '../_store/features/repositories/repositories.effects';
import { RepositoryEffects } from '../_store/features/repository/repository.effects';
import {
  REPOSITORY_FEATURE_KEY,
  repositoryReducer,
} from '../_store/features/repository/repository.reducer';

export const RepositoryRoutes: Route[] = [
  {
    path: '',
    providers: [
      provideEffects(RepositoriesEffects),
      provideState(REPOSITORIES_KEY, repositoriesReducer),
    ],
    loadComponent: () =>
      import('./repositories.component').then((x) => x.RepositoriesComponent),
  },
  {
    path: ':owner/:name',
    providers: [
      provideEffects(RepositoryEffects),
      provideState(REPOSITORY_FEATURE_KEY, repositoryReducer),
    ],
    loadComponent: () =>
      import('./repository/repository.component').then(
        (x) => x.RepositoryComponent
      ),
  },
];
