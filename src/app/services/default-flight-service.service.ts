import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { BASE_URL } from '../config/config';
import { Flight } from '../model/flight';
import { FlightService } from './flight.service';

@Injectable({
  providedIn: 'root',
})
export class DefaultFlightServiceService implements FlightService {
  private http = inject(HttpClient);
  private baseUrl = inject(BASE_URL);

  search(from: string, to: string): Observable<Flight[]> {
    const url = `${this.baseUrl}/api/flight`;

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
    const url = `${this.baseUrl}/api/flight`;

    const headers = {
      Accept: 'application/json',
    };

    return this.http.post<Flight>(url, flight, { headers });
  }
}
