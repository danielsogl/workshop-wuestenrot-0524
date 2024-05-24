import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, tap } from 'rxjs';
import { Flight } from './model/flight';

interface Passenger {
  id: number;
  name: string;
  flightId: number;
}

interface FlightWithPassengers extends Flight {
  passengers: Passenger[];
}

@Injectable({
  providedIn: 'root',
})
export class DemoStoreService {
  private flights = new BehaviorSubject<Flight[]>([]);
  public readonly flights$ = this.flights.asObservable();

  private passenger = new BehaviorSubject<Passenger[]>([]);
  public readonly passenger$ = this.passenger.asObservable();

  public readonly flightsWithPassengers$: Observable<FlightWithPassengers[]> =
    combineLatest({
      flights: this.flights$,
      passenger: this.passenger$,
    }).pipe(
      map(({ flights, passenger }) => {
        return flights.map((flight) => {
          const passengers = passenger.filter((p) => p.flightId === flight.id);
          return { ...flight, passengers } satisfies FlightWithPassengers;
        });
      })
    );

  loadFlights() {
    this.flights.next([]);
  }

  editFlight(flight: Partial<Flight>) {
    const flightToEdit = this.flights.value.find((f) => f.id === flight.id);

    if (flightToEdit) {
      const index = this.flights.value.indexOf(flightToEdit);
      const newFlights = [...this.flights.value];
      newFlights[index] = { ...flightToEdit, ...flight };
      this.flights.next(newFlights);
    }
  }
}
