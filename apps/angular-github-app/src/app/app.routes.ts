import { Route } from '@angular/router';
import { routeGuard } from './utilities/route-guard';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((x) => x.HomeComponent),
  },
  // dont use children, nested load-component doesnt work.
  // Only parent component gets loaded
  {
    path: 'repositories',
    canActivate: [routeGuard],
    loadChildren: () =>
      import('./repositories/repository-routes').then(
        (x) => x.RepositoryRoutes
      ),
  },
  {
    path: 'page-not-found',
    loadComponent: () =>
      import('./page-not-found/page-not-found.component').then(
        (x) => x.PageNotFoundComponent
      ),
  },
  { path: '**', redirectTo: 'page-not-found' },
];
