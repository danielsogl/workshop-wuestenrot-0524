import { Injectable, isDevMode } from '@angular/core';
import { Flight } from '../model/flight';
import { Observable } from 'rxjs';
import { DefaultFlightServiceService } from './default-flight-service.service';
import { DummyFlightService } from './dummy-flight.service';

@Injectable({
  providedIn: 'root',
  useFactory: () => {
    if (isDevMode()) {
      return new DummyFlightService();
    } else {
      return new DefaultFlightServiceService();
    }
  },
})
export abstract class FlightService {
  abstract search(from: string, to: string): Observable<Flight[]>;
  abstract save(flight: Flight): Observable<Flight>;
}
