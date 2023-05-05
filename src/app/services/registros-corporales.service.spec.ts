import { TestBed } from '@angular/core/testing';

import { RegistrosCorporalesService } from './registros-corporales.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistrosCorporalesService', () => {
  let service: RegistrosCorporalesService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(RegistrosCorporalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new RegistroCorporal', () => {
    service.nuevoRegistroCorporal("idJugador", 180, 70, 10, 10, 10, 10, 10, "observaciones");
  });


});
