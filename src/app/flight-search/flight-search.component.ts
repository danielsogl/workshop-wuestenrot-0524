import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { Flight } from '../model/flight';
import { FormsModule } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { DefaultFlightServiceService } from '../services/default-flight-service.service';
import { CityPipe } from '../shared/city.pipe';
import { StatusColorPipe } from '../shared/status-color.pipe';
import { StatusFilterPipe } from '../shared/status-filter.pipe';
import { SharedModule } from '../shared/shared.module';
import { FlightCardComponent } from '../flight-card/flight-card.component';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    StatusColorPipe,
    StatusFilterPipe,
    SharedModule,
    CityPipe,
    FlightCardComponent,
  ],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
  // providers: [
  //   { provide: FlightService, useClass: DefaultFlightServiceService },
  // ],
})
export class FlightSearchComponent {
  from = 'London';
  to = 'Hamburg';
  flights: Array<Flight> = [];
  selectedFlight: Flight | undefined;

  basket: Record<number, boolean> = {
    1209: true,
  };

  message = '';
  onlyDelayed = false;

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
    setTimeout(() => {
      this.selectedFlight = { ...f };
    }, 10000);
  }
}
