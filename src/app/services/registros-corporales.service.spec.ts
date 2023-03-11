import { TestBed } from '@angular/core/testing';

import { RegistrosCorporalesService } from './registros-corporales.service';

describe('RegistrosCorporalesService', () => {
  let service: RegistrosCorporalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrosCorporalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
