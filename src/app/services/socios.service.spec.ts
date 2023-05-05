import { TestBed } from '@angular/core/testing';

import { SociosService } from './socios.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Socio } from '../models/Socio';
import { TipoAbono } from '../models/TipoAbono';
import { EstadoSocio } from '../models/EstadoSocio';

describe('SociosService', () => {
  let service: SociosService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(SociosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of Socio', () => {
    const tipoAbono: TipoAbono = {idtipos_carnet: 1, tipo: 'tipo', precio: 99, socios: []};
    const estado_22223: EstadoSocio = {idestados_socios: 1, codigo: 'test', descripcion: 'test', socios: []};
    const dummySocios: Socio[] = [{ idsocio: '1', nombre_completo: 'Juan', domicilio: 'Prueba', poblacion: 'PobPrueba', telefono: '99999999', correo_electronico: 'test@test.com', 
    fecha_nacimiento: '02/01/1998', dni: '99999999R', tipo_abono: tipoAbono, estado_2223: estado_22223}];
    // Espiar la función http.get para devolver un Observable con los datos de prueba
    spyOn(http, 'get').and.returnValue(of(dummySocios));
    // Llamar al método getSocios() y comprobar si devuelve un Observable con los datos de prueba
    service.getSocios().subscribe((socios) => {
      expect(socios).toEqual(dummySocios);
    });
  });

  it('should add a new Socio', () => {
    const tipoAbono: TipoAbono = {idtipos_carnet: 1, tipo: 'tipo', precio: 99, socios: []};
    const estado_22223: EstadoSocio = {idestados_socios: 1, codigo: 'test', descripcion: 'test', socios: []};
    const nuevoSocio: Socio = { 
      idsocio: '3', 
      nombre_completo: 'Nombre prueba', 
      domicilio: 'Prueba', 
      poblacion: 'Prueba', 
      telefono: '999999999', 
      correo_electronico: 'test@test.com', 
      fecha_nacimiento: '01/01/1970', 
      dni: '12345678A', 
      tipo_abono: tipoAbono, 
      estado_2223: estado_22223
    };
    spyOn(http, 'post').and.returnValue(of(nuevoSocio));
  
    service.addSocio(nuevoSocio).subscribe((socio) => {
      expect(socio).toEqual(nuevoSocio);
    });
  });

  it('should delete a Socio', () => {
    const tipoAbono: TipoAbono = {idtipos_carnet: 1, tipo: 'tipo', precio: 99, socios: []};
    const estado_22223: EstadoSocio = {idestados_socios: 1, codigo: 'test', descripcion: 'test', socios: []};
    const socioEliminado: Socio = { 
      idsocio: '3', 
      nombre_completo: 'John Doe', 
      domicilio: '123 Main St', 
      poblacion: 'Anytown', 
      telefono: '555-555-5555', 
      correo_electronico: 'john.doe@example.com', 
      fecha_nacimiento: '01/01/1970', 
      dni: '12345678A', 
      tipo_abono: tipoAbono, 
      estado_2223: estado_22223
    };
    const idSocioAEliminar: String = "1";

    spyOn(http, 'delete').and.returnValue(of(socioEliminado));
  
    service.deleteById(idSocioAEliminar).subscribe((socio) => {
      expect(socio).toEqual(socioEliminado);
    });
  });

  it('should update a Socio', () => {
    const tipoAbono: TipoAbono = {idtipos_carnet: 1, tipo: 'tipo', precio: 99, socios: []};
    const estado_22223: EstadoSocio = {idestados_socios: 1, codigo: 'test', descripcion: 'test', socios: []};
    const socioActualizado: Socio = { 
      idsocio: '3', 
      nombre_completo: 'John Doe', 
      domicilio: '123 Main St', 
      poblacion: 'Anytown', 
      telefono: '555-555-5555', 
      correo_electronico: 'john.doe@example.com', 
      fecha_nacimiento: '01/01/1970', 
      dni: '12345678A', 
      tipo_abono: tipoAbono, 
      estado_2223: estado_22223
    };

    spyOn(http, 'put').and.returnValue(of(socioActualizado));
  
    service.updateById(socioActualizado).subscribe((socio) => {
      expect(socio).toEqual(socioActualizado);
    });
  });

});
