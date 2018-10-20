import { TestBed } from '@angular/core/testing';

import { BusinessCardParser } from './business-card-parser.service';

describe('BusinessCardParser', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessCardParser = TestBed.get(BusinessCardParser);
    expect(service).toBeTruthy();
  });
});
