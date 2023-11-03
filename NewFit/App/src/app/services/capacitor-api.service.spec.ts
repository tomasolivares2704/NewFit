import { TestBed } from '@angular/core/testing';

import { CapacitorApiService } from './capacitor-api.service';

describe('CapacitorApiService', () => {
  let service: CapacitorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CapacitorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
