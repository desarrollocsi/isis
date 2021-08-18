import { TestBed } from '@angular/core/testing';

import { ProgramaciondesalasService } from './programaciondesalas.service';

describe('ProgramaciondesalasService', () => {
  let service: ProgramaciondesalasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramaciondesalasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
