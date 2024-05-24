import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Flight, initialFlight } from '../../model/flight';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './flight-edit.component.html',
  styleUrl: './flight-edit.component.scss',
})
export class FlightEditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private flightService = inject(FlightService);

  id = '';
  showDetails = '';
  flight: Flight | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ?? '';
      this.showDetails = params.get('showDetails') ?? '';
      this.load(this.id);
    });
  }

  load(id: string): void {
    this.flightService.findById(id).subscribe((flight) => {
      this.flight = flight;
    });
  }
}
