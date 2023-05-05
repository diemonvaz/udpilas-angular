import { TestBed } from '@angular/core/testing';

import { EquiposService } from './equipos.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Equipo } from '../models/Equipo';
import { of } from 'rxjs';

describe('EquiposService', () => {
  let service: EquiposService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]

    });
    http = TestBed.inject(HttpClient);

    service = TestBed.inject(EquiposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of Equipo', () => {
    const dummyEquipos: Equipo[] = [{idequipos: '1', nombre: 'Equipo TEST',  jugadores: []}];
    spyOn(http, 'get').and.returnValue(of(dummyEquipos));
    
    service.getEquipos().subscribe((equipos) => {
      expect(equipos).toEqual(dummyEquipos);
    });
  });

  it('should return an array of all Equipo without filtering', () => {
    const dummyEquipos: Equipo[] = [{idequipos: '1', nombre: 'Equipo TEST',  jugadores: []}];
    spyOn(http, 'get').and.returnValue(of(dummyEquipos));
    
    service.getEquiposAdm().subscribe((equipos) => {
      expect(equipos).toEqual(dummyEquipos);
    });
  });


});
