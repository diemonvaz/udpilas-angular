import { TestBed } from '@angular/core/testing';

import { MiembrosService } from './miembros.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Usuario } from '../models/Usuario';
import { Miembro } from '../models/Miembro';
import { of } from 'rxjs';

describe('MiembrosService', () => {
  let service: MiembrosService;
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(MiembrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return an array of Miembro', () => {
    const usuario: Usuario = {idusuario: '1', nombre: 'nombre', apellidos: 'apellidos', email: 'test@test.com', fecha_nacimiento: '02/05/2001', telefono: '999999999', roles: []};
    const dummyMiembros: Miembro[] = [{idmiembro: '1', domicilio: 'Calle Test', poblacion: 'Poblacion Test', dni: '99R', usuario: usuario, roles: []}];
    // Espiar la función http.get para devolver un Observable con los datos de prueba
    spyOn(http, 'get').and.returnValue(of(dummyMiembros));
    // Llamar al método getSocios() y comprobar si devuelve un Observable con los datos de prueba
    service.getMiembros().subscribe((miembros) => {
      expect(miembros).toEqual(dummyMiembros);
    });
  });

  it('should add a new Miembro', () => {
    const usuario: Usuario = {idusuario: '1', nombre: 'nombre', apellidos: 'apellidos', email: 'test@test.com', fecha_nacimiento: '02/05/2001', telefono: '999999999', roles: []};
    const nuevoMiembro: Miembro = {idmiembro: '1', domicilio: 'Calle Test', poblacion: 'Poblacion Test', dni: '99R', usuario: usuario, roles: []};
    spyOn(http, 'post').and.returnValue(of(nuevoMiembro));
    const roles: string[] = [];
    service.registrarMiembro('test@test.com', 'password', 'nombre', 'apellidos', '99R', 'Poblacion Test', '999999999', '02/05/2001', 'Calle Test', roles).subscribe((miembro) => {
      expect(miembro).toEqual(nuevoMiembro);
    });
  });


  it('should delete a Miembro', () => {
    const idMiembroAEliminar = '1';
    spyOn(http, 'delete').and.returnValue(of({})).and.callThrough();
  
    service.deleteById(idMiembroAEliminar).subscribe(() => {
      expect(http.delete).toHaveBeenCalledWith(`${service.urlMiembros}/${idMiembroAEliminar}`);
    });
  });

  it('should update a Miembro', () => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const usuario: Usuario = {idusuario: '1', nombre: 'nombre', apellidos: 'apellidos', email: 'test@test.com', fecha_nacimiento: '02/05/2001', telefono: '999999999', roles: []};
    const miembroActualizado: Miembro = {idmiembro: '1', domicilio: 'Calle Test', poblacion: 'Poblacion Test', dni: '99R', usuario: usuario, roles: []};

    spyOn(http, 'put').and.returnValue(of(miembroActualizado)).and.callThrough();
    service.updateById(miembroActualizado).subscribe(() => {
      expect(http.put).toHaveBeenCalledWith(`${service.urlMiembros}/${miembroActualizado.idmiembro}`, miembroActualizado, httpOptions);
    });
  });


});
