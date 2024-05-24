import { TestBed } from '@angular/core/testing';

import { DemoStoreService } from './demo-store.service';

describe('DemoStoreService', () => {
  let service: DemoStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemoStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
