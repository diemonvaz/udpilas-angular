import { TestBed } from '@angular/core/testing';

import { EstadosSociosService } from './estados-socios.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EstadoSocio } from '../models/EstadoSocio';
import { of } from 'rxjs';

describe('EstadosSociosService', () => {
  let service: EstadosSociosService;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(EstadosSociosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of EstadoSocio', () => {
    const dummyEstados: EstadoSocio[] = [{idestados_socios: 1, codigo: 'test', descripcion: 'test', socios: []}];
    spyOn(http, 'get').and.returnValue(of(dummyEstados));
    service.getEstados().subscribe((estados) => {
      expect(estados).toEqual(dummyEstados);
    });
  });
  
});
