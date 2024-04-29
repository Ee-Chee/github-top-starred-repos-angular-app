import { Route } from '@angular/router';

export const RepositoryRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./repositories.component').then((x) => x.RepositoriesComponent),
  },
  {
    path: ':owner/:name',
    loadComponent: () =>
      import('./repository/repository.component').then(
        (x) => x.RepositoryComponent
      ),
  },
];
