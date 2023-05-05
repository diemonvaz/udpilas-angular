import { TestBed } from '@angular/core/testing';

import { JugadoresService } from './jugadores.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Jugador } from '../models/Jugador';
import { Imagen } from '../models/Imagen';
import { of } from 'rxjs';

describe('JugadoresService', () => {
  let service: JugadoresService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(JugadoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should add a new Jugador', () => {
    const imagen: Imagen =  {nombre: 'pathImagen'};
    const nuevoJugador: Jugador = {idjugadores: '1', nombre: 'jugadorPrueba', apellidos: 'test', fecha_nacimiento: 'NA',
      posicion: 'Lateral', dni: '99R', reconocimiento_medico: 'NA', duracion: 'NA', imagen: imagen, registros: []};
    spyOn(http, 'post').and.returnValue(of(nuevoJugador));
  
    service.registrarJugador(nuevoJugador.nombre.toString(), nuevoJugador.apellidos.toString(), nuevoJugador.posicion.toString(), nuevoJugador.fecha_nacimiento.toString(), nuevoJugador.posicion.toString(),
        nuevoJugador.dni.toString(), nuevoJugador.reconocimiento_medico.toString(), 'observaciones' ,nuevoJugador.duracion.toString(), "urlImagen").subscribe((entrenamiento) => {
      expect(entrenamiento).toEqual(nuevoJugador);
    });
  });

  it('should delete a Jugador', () => {
    const idJugadorAEliminar = '1';
    spyOn(http, 'delete').and.returnValue(of({})).and.callThrough();
  
    service.deleteById(idJugadorAEliminar).subscribe(() => {
      expect(http.delete).toHaveBeenCalledWith(`${service.urlJugadores}/${idJugadorAEliminar}`);
    });
  });

  it('should update a Jugador', () => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const imagen: Imagen =  {nombre: 'pathImagen'};
    const jugadorActualizado: Jugador = {idjugadores: '1', nombre: 'jugadorPrueba', apellidos: 'test', fecha_nacimiento: 'NA',
      posicion: 'Lateral', dni: '99R', reconocimiento_medico: 'NA', duracion: 'NA', imagen: imagen, registros: []};

    spyOn(http, 'put').and.returnValue(of(jugadorActualizado)).and.callThrough();
    service.updateById(jugadorActualizado).subscribe(() => {
      expect(http.put).toHaveBeenCalledWith(`${service.urlJugadores}/${jugadorActualizado.idjugadores}`, jugadorActualizado, httpOptions);
    });
  });

  it('should post a Jugador into a different Equipo', () => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const idJugador: String = "1";
    const idEquipoDest: string = "1";
    spyOn(http, 'post').and.returnValue(of({})).and.callThrough();
    service.transferirJugador(idJugador, idEquipoDest).subscribe(() => {
      expect(http.put).toHaveBeenCalledWith(`${service.urlJugadores + "transferirJugador"}`,idJugador, httpOptions);
    });
  });




});
