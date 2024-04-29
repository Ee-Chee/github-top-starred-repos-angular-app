import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAccessToken } from '../_store/root/base-info/base.selectors';

export const routeGuard: CanActivateFn = ():
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAccessToken).pipe(
    take(1),
    map((token) => {
      if (token) {
        return true;
      } else {
        return router.parseUrl('/home');
      }
    })
  );
};
