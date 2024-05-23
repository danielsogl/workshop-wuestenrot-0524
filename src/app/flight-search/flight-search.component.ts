import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Flight } from '../model/flight';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { DummyFlightService } from '../services/dummy-flight.service';
import { DefaultFlightServiceService } from '../services/default-flight-service.service';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  providers: [
    { provide: FlightService, useClass: DefaultFlightServiceService },
  ],
})
export class FlightSearchComponent {
  from = 'London';
  to = 'Paris';
  flights: Array<Flight> = [];
  selectedFlight: Flight | undefined;

  message = '';

  private flightService = inject(FlightService);

  // old way to use the dependency inject
  // constructor(private http: HttpClient) {}

  search(): void {
    // Reset properties
    this.message = '';
    this.selectedFlight = undefined;

    this.flightService.search(this.from, this.to).subscribe({
      next: (flights) => {
        this.flights = flights;
      },
      error: (errResp) => {
        console.error('Error loading flights', errResp);
      },
      complete() {
        console.log('Complete');
      },
    });
  }

  save(): void {
    if (!this.selectedFlight) return;
    this.flightService.save(this.selectedFlight).subscribe({
      next: (flight) => {
        this.selectedFlight = flight;
        this.message = 'Update successful!';
      },
      error: (errResponse) => {
        this.message = 'Error on updating the Flight';
        console.error(this.message, errResponse);
      },
    });
  }

  select(f: Flight): void {
    this.selectedFlight = { ...f };
  }
}
