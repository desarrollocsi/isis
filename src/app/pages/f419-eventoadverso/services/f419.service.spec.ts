import { TestBed } from '@angular/core/testing';

import { F419Service } from './f419.service';

describe('F419Service', () => {
  let service: F419Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(F419Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
