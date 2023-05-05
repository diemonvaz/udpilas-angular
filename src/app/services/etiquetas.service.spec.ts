import { TestBed } from '@angular/core/testing';

import { EtiquetasService } from './etiquetas.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Etiqueta } from '../models/Etiqueta';
import { of } from 'rxjs';

describe('EtiquetasService', () => {
  let service: EtiquetasService;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(EtiquetasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return an array of Etiqueta', () => {
    const dummyEtiquetas: Etiqueta[] = [{nombre: 'EtiquetaPrueba'}];
    spyOn(http, 'get').and.returnValue(of(dummyEtiquetas));
    service.getAllEtiquetas().subscribe((etiquetas) => {
      expect(etiquetas).toEqual(dummyEtiquetas);
    });
  });

  it('should return a previously created and posted Etiqueta', () => {
    const etiquetaCreada: Etiqueta = {nombre: 'EtiquetaPrueba'};
    spyOn(http, 'post').and.returnValue(of(etiquetaCreada));
    service.addEtiqueta(etiquetaCreada).subscribe((etiquetas) => {
      expect(etiquetas).toEqual(etiquetaCreada);
    });
  });


});
