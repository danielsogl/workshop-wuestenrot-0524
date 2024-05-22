import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight } from '../models/flight';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './flight-search.component.html',
  styleUrl: './flight-search.component.scss',
})
export class FlightSearchComponent {
  from = 'London';
  to = 'Berlin';

  // flights: Array<Flight> = [];
  flights: Flight[] = [];

  constructor() {}

  search() {
    console.log(this.from, this.to);

    this.flights = [
      {
        id: 1,
        from: 'London',
        to: 'Berlin',
        date: '2020-12-24T17:00:00.000Z',
        delayed: false,
      },
      {
        id: 2,
        from: 'London',
        to: 'Berlin',
        date: '2020-12-24T17:30:00.000Z',
        delayed: true,
      },
      {
        id: 3,
        from: 'London',
        to: 'Berlin',
        date: '2020-12-24T18:00:00.000Z',
        delayed: false,
      },
    ];
  }
}
