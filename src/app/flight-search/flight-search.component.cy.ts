import { FlightService } from '../services/flight.service';
import { FlightSearchComponent } from './flight-search.component';
import { MockProvider } from 'ng-mocks';

describe('FlightSearchComponent', () => {
  it('should render search flight', () => {
    cy.mount(FlightSearchComponent, {
      providers: [MockProvider(FlightService)],
    });

    cy.get('input[name=from]').clear();
    cy.get('input[name=from]').type('Foo');
    cy.get('input[name=to]').clear();
    cy.get('input[name=to]').type('Bar');
  });
});
