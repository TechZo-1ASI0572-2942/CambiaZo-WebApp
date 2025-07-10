import { TestBed } from '@angular/core/testing';

import { ExchangeLockerService } from './exchange-locker.service';

describe('ExchangeLockerService', () => {
  let service: ExchangeLockerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExchangeLockerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
