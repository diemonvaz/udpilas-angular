import { TestBed } from '@angular/core/testing';

import { EstadosSociosService } from './estados-socios.service';

describe('EstadosSociosService', () => {
  let service: EstadosSociosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosSociosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
