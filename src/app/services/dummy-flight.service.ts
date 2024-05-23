import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flight } from '../model/flight';
import { FlightService } from './flight.service';

@Injectable({
  providedIn: 'root',
})
export class DummyFlightService implements FlightService {
  search(from: string, to: string): Observable<Flight[]> {
    return of([
      {
        id: 1,
        from: 'London',
        to: 'Paris',
        date: new Date().toDateString(),
        delayed: true,
      },
      {
        id: 2,
        from: 'London',
        to: 'Paris',
        date: new Date().toDateString(),
        delayed: false,
      },
      {
        id: 3,
        from: 'London',
        to: 'Paris',
        date: new Date().toDateString(),
        delayed: true,
      },
    ] satisfies Flight[]);
  }

  save(flight: Flight): Observable<Flight> {
    return of({
      id: 3,
      from: 'London',
      to: 'Paris',
      date: new Date().toDateString(),
      delayed: true,
    });
  }
}
