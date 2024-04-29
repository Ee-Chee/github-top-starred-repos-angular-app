import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  validatePersonalToken(token: string): Observable<string> {
    return of('any');
  }
}
