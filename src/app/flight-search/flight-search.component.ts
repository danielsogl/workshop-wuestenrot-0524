import {
  Component,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
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
import { debounceTime } from 'rxjs';
import { FlightSearchStore } from './flight-search.store';

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
  providers: [
    { provide: FlightService, useClass: DefaultFlightServiceService },
  ],
})
export class FlightSearchComponent {
  from = signal<string>('London');
  to = signal<string>('Hamburg');
  flights = signal<Flight[]>([]);
  selectedFlight = signal<Flight | undefined>(undefined);

  searchValues = toSignal(
    toObservable(
      computed(() => ({
        from: this.from(),
        to: this.to(),
      }))
    ).pipe(debounceTime(500)),
    { initialValue: { from: 'London', to: 'Paris' } }
  );

  triggerSearch = effect(
    () => {
      this.search();
    },
    { allowSignalWrites: true }
  );

  basket: Record<number, boolean> = {
    1209: true,
  };
  message = '';
  onlyDelayed = false;

  private flightService = inject(FlightService);
  protected flightSearchStore = inject(FlightSearchStore);

  // old way to use the dependency inject
  // constructor(private http: HttpClient) {}

  search(): void {
    // Reset properties
    this.message = '';
    this.selectedFlight.set(undefined);

    const { from, to } = this.searchValues();
    this.flightSearchStore.search(from, to);
  }

  save(): void {
    if (!this.selectedFlight) return;
    this.flightService.save(this.selectedFlight()!).subscribe({
      next: (flight) => {
        this.selectedFlight.set(flight);
        this.message = 'Update successful!';
      },
      error: (errResponse) => {
        this.message = 'Error on updating the Flight';
        console.error(this.message, errResponse);
      },
    });
  }

  select(f: Flight): void {
    this.selectedFlight.set({ ...f });
  }

  updateFlight(f: Partial<Flight>): void {
    this.selectedFlight.update((flight) => {
      if (!flight) return;
      return { ...flight, ...f };
    });
  }
}
