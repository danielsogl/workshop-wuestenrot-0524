import { TestBed } from '@angular/core/testing';

import { DefaultFlightServiceService } from './default-flight-service.service';

describe('DefaultFlightServiceService', () => {
  let service: DefaultFlightServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultFlightServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
