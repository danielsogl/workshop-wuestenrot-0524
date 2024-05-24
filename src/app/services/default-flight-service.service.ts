import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../model/flight';
import { FlightService } from './flight.service';
import { ConfigService } from '../shared/config.service';
import { patchState, signalState } from '@ngrx/signals';
import { updateState } from '@angular-architects/ngrx-toolkit';

@Injectable({
  providedIn: 'root',
})
export class DefaultFlightServiceService implements FlightService {
  private http = inject(HttpClient);
  private configService = inject(ConfigService);

  store = signalState({
    flights: [],
    loading: false,
    selectedFlight: {} as Flight,
  });

  constructor() {
    patchState(this.store, { flights: [] });
  }

  search(from: string, to: string): Observable<Flight[]> {
    const url = `${this.configService.config.baseUrl}/flight`;

    const headers = {
      Accept: 'application/json',
    };

    const params = {
      from,
      to,
    };

    return this.http.get<Flight[]>(url, { headers, params });
  }

  save(flight: Flight): Observable<Flight> {
    const url = `${this.configService.config.baseUrl}/flight`;

    const headers = {
      Accept: 'application/json',
    };

    return this.http.post<Flight>(url, flight, { headers });
  }
}
