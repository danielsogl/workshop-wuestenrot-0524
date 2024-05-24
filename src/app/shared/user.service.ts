import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isAdmin = false;

  getUser(): Observable<{}> {
    return of({}).pipe(delay(5000));
  }
}
