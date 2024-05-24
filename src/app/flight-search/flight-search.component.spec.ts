// import {
//   ComponentFixture,
//   TestBed,
//   fakeAsync,
//   tick,
// } from '@angular/core/testing';
// import { MockProvider } from 'ng-mocks';

// import { FlightSearchComponent } from './flight-search.component';
// import { provideHttpClient } from '@angular/common/http';
// import { FlightService } from '../services/flight.service';
// import { Observable, of, throwError } from 'rxjs';
// import { Flight } from '../model/flight';

class MockFlightService implements FlightService {
  search(from: string, to: string): Observable<Flight[]> {
    return of([
      {
        id: 1,
        from: 'Foo',
        to: 'Bar',
        date: '',
        delayed: false,
      },
    ]);
  }

  save(flight: Flight): Observable<Flight> {
    return of(flight);
  }
}

// fdescribe('FlightSearchComponent', () => {
//   let component: FlightSearchComponent;
//   let fixture: ComponentFixture<FlightSearchComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [FlightSearchComponent],
//       providers: [
//         // provideHttpClient(),
//         // MockProvider(FlightService)
//         { provide: FlightService, useClass: MockFlightService },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(FlightSearchComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should search for flights', () => {
//     // Arrange
//     component.from = 'Foo';
//     component.to = 'Bar';
//     component.message = 'Hello';
//     component.selectedFlight = {
//       id: 1,
//       from: 'Foo',
//       to: 'Bar',
//       date: '',
//       delayed: false,
//     } satisfies Flight;

//     // spy on the flight service
//     const flightService = TestBed.inject(FlightService);
//     spyOn(flightService, 'search').and.callThrough();
//     // Act
//     component.search();
//     // Assert
//     expect(component.message).toBe('');
//     expect(component.selectedFlight).toBeUndefined();
//     expect(flightService.search).toHaveBeenCalledWith('Foo', 'Bar');
//     expect(component.flights.length).toEqual(1);
//   });

//   it('should print our an console.error if the flights service returns an error', () => {
//     // Arrange
//     component.from = 'Foo';
//     component.to = 'Bar';
//     component.message = 'Hello';
//     component.selectedFlight = {
//       id: 1,
//       from: 'Foo',
//       to: 'Bar',
//       date: '',
//       delayed: false,
//     } satisfies Flight;

//     // spy on the flight service
//     const flightService = TestBed.inject(FlightService);
//     spyOn(flightService, 'search').and.returnValue(
//       throwError(() => new Error('Error'))
//     );
//     spyOn(console, 'error').and.callThrough();

//     // Act
//     component.search();

//     // Assert
//     expect(console.error).toHaveBeenCalledWith(
//       'Error loading flights',
//       new Error('Error')
//     );
//   });

//   it('should select flight', fakeAsync(() => {
//     // Arrange
//     const flight: Flight = {
//       id: 1,
//       from: 'Foo',
//       to: 'Bar',
//       date: '',
//       delayed: false,
//     };

//     // Act
//     component.select(flight);
//     tick(10000);

//     // Assert
//     expect(component.selectedFlight).toEqual(flight);
//   }));

//   fdescribe('integration tests', () => {
//     it('should disable search button if from or to is empty', () => {
//       // arrange
//       component.from = '';
//       component.to = 'Bar';

//       // act
//       fixture.detectChanges();

//       const button = (fixture.nativeElement as HTMLElement).querySelector(
//         '[data-testid="search-button"]'
//       ) as HTMLButtonElement;
//       expect(button!.disabled).toBeTrue();
//     });

//     it('should perform search on search button click', () => {
//       // arrange
//       component.from = 'Foo';
//       component.to = 'Bar';
//       const flightService = TestBed.inject(FlightService);
//       spyOn(flightService, 'search').and.callThrough();

//       // act
//       fixture.detectChanges();

//       const button = (fixture.nativeElement as HTMLElement).querySelector(
//         '[data-testid="search-button"]'
//       ) as HTMLButtonElement;
//       button.click();

//       // assert
//       expect(component.flights.length).toBe(1);
//     });
//   });
// });

import {
  render,
  fireEvent,
  findAllByTestId,
  screen,
} from '@testing-library/angular';
import { FlightSearchComponent } from './flight-search.component';
import { FlightService } from '../services/flight.service';
import { Observable, of } from 'rxjs';
import { Flight } from '../model/flight';

fdescribe('Testing with testing library', () => {
  it('should perform search on search button click', async () => {
    const { findByTestId, debugElement } = await render(FlightSearchComponent, {
      providers: [{ provide: FlightService, useClass: MockFlightService }],
    });
    fireEvent.click(await findByTestId('search-button'));
    const flightCards = await findByTestId('flight-card');
    expect(flightCards).toBeTruthy();
    screen.logTestingPlaygroundURL();
  });
});
