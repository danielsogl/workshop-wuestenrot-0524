import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { Flight } from '../../model/flight';
import { FlightService } from '../../services/flight.service';
import { CityPipe } from '../../shared/city.pipe';
import { SharedModule } from '../../shared/shared.module';
import { StatusColorPipe } from '../../shared/status-color.pipe';
import { StatusFilterPipe } from '../../shared/status-filter.pipe';
import { CityValidators } from '../../shared/validation/city-validator';
import { FlightCardComponent } from '../flight-card/flight-card.component';

interface FlightSearchForm {
  from: FormControl<string>;
  to: FormControl<string>;
  onlyDelayed: FormControl<boolean>;
  withValidators: FormControl<boolean>;
}

@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StatusColorPipe,
    StatusFilterPipe,
    SharedModule,
    CityPipe,
    FlightCardComponent,
  ],
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.scss'],
})
export class FlightSearchComponent implements OnInit {
  private flightService = inject(FlightService);

  // from = 'London';
  // to = 'Hamburg';
  flights: Array<Flight> = [];
  selectedFlight: Flight | undefined;

  basket: Record<number, boolean> = {
    1209: true,
  };

  message = '';
  onlyDelayed = false;

  private formBuilder = inject(FormBuilder);

  from = this.formBuilder.group({
    value: [
      '',
      [Validators.required, Validators.minLength(3)],
      [CityValidators.validateCityAsync(this.flightService)],
    ],
    disabled: false,
  });

  searchForm = new FormGroup<FlightSearchForm>(
    {
      from: new FormControl('London', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          // CityValidators.validateCity(['Graz', 'Hamburg', 'Frankfurt', 'Vienna']),
        ],
        asyncValidators: [CityValidators.validateCityAsync(this.flightService)],
        nonNullable: true,
      }),
      to: new FormControl('Hamburg', {
        validators: [
          Validators.required,
          Validators.minLength(3),
          // CityValidators.validateCity(['Graz', 'Hamburg', 'Frankfurt', 'Vienna']),
        ],
        asyncValidators: [CityValidators.validateCityAsync(this.flightService)],
        nonNullable: true,
      }),
      onlyDelayed: new FormControl(false, { nonNullable: true }),
      withValidators: new FormControl(false, { nonNullable: true }),
    },
    {
      validators: [CityValidators.validateRoundtrip],
    }
  );

  ngOnInit(): void {
    // this.searchForm.valueChanges.subscribe((value) => {
    //   console.log('Value changed', value);
    // });

    this.searchForm.controls['withValidators'].valueChanges.subscribe(
      (value) => {
        const validators = [Validators.required, Validators.minLength(3)];
        if (value) {
          this.searchForm.controls['from'].setValidators(validators);
          this.searchForm.controls['to'].setValidators(validators);
        } else {
          this.searchForm.controls['from'].clearValidators();
          this.searchForm.controls['to'].clearValidators();
        }

        this.searchForm.updateValueAndValidity();
      }
    );
  }

  // old way to use the dependency inject
  // constructor(private http: HttpClient) {}

  search(): void {
    // Reset properties
    this.message = '';
    this.selectedFlight = undefined;

    const { from, to } = this.searchForm.getRawValue();

    this.flightService.search(from, to).subscribe({
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
