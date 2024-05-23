import { inject } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
import { FlightService } from '../../services/flight.service';
import { Observable, filter, map, of } from 'rxjs';

// validator without input properties
// export const validateCity = (
//   control: AbstractControl
// ): ValidationErrors | null => {
//   const validCities = ['Graz', 'Hamburg', 'Frankfurt', 'Vienna'];
//   const value = control.value;

//   return validCities.includes(value) ? null : { city: true };
// };

// export const validateCity = (validCities: string[]) => {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;

//     return validCities.includes(value) ? null : { city: true };
//   };
// };

export class CityValidators {
  static validateCity(validCities: string[]) {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      return validCities.includes(value) ? null : { city: true };
    };
  }

  static validateCityAsync = (flightService: FlightService) => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;

      return flightService.search(value, '').pipe(
        map((flights) => {
          return flights.length === 0 ? { cityAsync: true } : null;
        })
      );
    };
  };

  static validateRoundtrip = (
    control: AbstractControl<FormGroup>
  ): ValidationErrors | null => {
    const from = control.get('from')?.value;
    const to = control.get('to')?.value;

    return from === to ? { roundtrip: true } : null;
  };
}
