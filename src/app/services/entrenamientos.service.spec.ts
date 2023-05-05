import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EntrenamientosService } from './entrenamientos.service';
import { HttpClient } from '@angular/common/http';
import { Entrenamiento } from '../models/Entrenamiento';
import { Miembro } from '../models/Miembro';
import { Usuario } from '../models/Usuario';
import { Equipo } from '../models/Equipo';
import { Observable, of } from 'rxjs';

describe('EntrenamientosService', () => {
  let service: EntrenamientosService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(EntrenamientosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of Entrenamiento', () => {
    const usuario: Usuario = {idusuario: '1', nombre: 'nombre', apellidos: 'apellidos', email: 'test@test.com', fecha_nacimiento: '02/05/2001', telefono: '999999999', roles: []};
    const miembro: Miembro = {idmiembro: '1', domicilio: 'Calle Test', poblacion: 'Poblacion Test', dni: '99R', usuario: usuario, roles: []};
    const equipo: Equipo = {idequipos: '1', nombre: 'Equipo TEST',  jugadores: []};
    const dummyEntrenamientos: Entrenamiento[] = [{identrenamientos: '1', fecha: '03/10/2022', observaciones: 'NA', miembro: miembro, equipo: equipo, jugadores: []}];

    spyOn(http, 'get').and.returnValue(of(dummyEntrenamientos));
    
    service.getEntrenamientos().subscribe((entrenamientos) => {
      expect(entrenamientos).toEqual(dummyEntrenamientos);
    });
  });

  it('should add a new Entrenamiento', () => {
    const usuario: Usuario = {idusuario: '1', nombre: 'nombre', apellidos: 'apellidos', email: 'test@test.com', fecha_nacimiento: '02/05/2001', telefono: '999999999', roles: []};
    const miembro: Miembro = {idmiembro: '1', domicilio: 'Calle Test', poblacion: 'Poblacion Test', dni: '99R', usuario: usuario, roles: []};
    const equipo: Equipo = {idequipos: '1', nombre: 'Equipo TEST',  jugadores: []};
    const nuevoEntrenamiento: Entrenamiento = {identrenamientos: '1', fecha: '03/10/2022', observaciones: 'NA', miembro: miembro, equipo: equipo, jugadores: []};
    spyOn(http, 'post').and.returnValue(of(nuevoEntrenamiento));
  
    service.nuevoEntrenamiento(nuevoEntrenamiento.identrenamientos, nuevoEntrenamiento.fecha, nuevoEntrenamiento.observaciones, nuevoEntrenamiento.jugadores, nuevoEntrenamiento.equipo.idequipos).subscribe((entrenamiento) => {
      expect(entrenamiento).toEqual(nuevoEntrenamiento);
    });
  });

  it('should delete an Entrenamiento', () => {
    const idEntrenamientoAEliminar = '1';
    spyOn(http, 'delete').and.returnValue(of({})).and.callThrough();
  
    service.deleteById(idEntrenamientoAEliminar).subscribe(() => {
      expect(http.delete).toHaveBeenCalledWith(`${service.urlEntrenamientos}/${idEntrenamientoAEliminar}`);
    });
  });

});
