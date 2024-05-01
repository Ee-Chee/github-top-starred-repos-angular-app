import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AUTHENTICATE } from '../../../graphql.queries';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  private apollo = inject(Apollo);

  validatePersonalToken(token: string): Observable<string> {
    return this.apollo
      .query({
        query: AUTHENTICATE,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      })
      .pipe(map(() => token));
  }
}
