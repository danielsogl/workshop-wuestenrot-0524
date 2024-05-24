import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../model/flight';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { filter, map, share, shareReplay, switchMap } from 'rxjs';

@Component({
  selector: 'app-flight-edit',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './flight-edit.component.html',
  styleUrl: './flight-edit.component.scss',
})
export class FlightEditComponent {
  private route = inject(ActivatedRoute);
  private flightService = inject(FlightService);

  id = '';
  showDetails = '';
  flight: Flight | undefined;

  flight$ = this.route.paramMap.pipe(
    filter((params) => params.has('id')),
    map((params) => params.get('id')!),
    // higher order operator
    switchMap((id) => this.flightService.findById(id)),
    // multicasting
    shareReplay({ refCount: true, bufferSize: 1 })
  );

  // ngOnInit(): void {
  //   this.route.paramMap.subscribe((params) => {
  //     this.id = params.get('id') ?? '';
  //     this.showDetails = params.get('showDetails') ?? '';
  //     this.load(this.id);
  //   });
  // }

  // load(id: string): void {
  //   this.flightService.findById(id).subscribe((flight) => {
  //     this.flight = flight;
  //   });
  // }
}
