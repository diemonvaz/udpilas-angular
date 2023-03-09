import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jugador } from '../models/Jugador';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class JugadoresService {
  urlJugadores = 'http://localhost:3000/jugadores/';
  constructor(private http: HttpClient) { }


  registrarJugador(nombre: string, apellidos: string, posicion: string, fecha_nacimiento: string, dni: string, rec_medico: string,
    duracion: string, equipo: string, observaciones: string, imagen: string): Observable<Jugador> {
    return this.http.post<Jugador>(this.urlJugadores + 'registro', {nombre, apellidos, posicion, fecha_nacimiento, dni, rec_medico, duracion,
      equipo, observaciones, imagen }, httpOptions);
  }


  deleteById(id: String): Observable<Response> {
    return this.http.delete<Response>(this.urlJugadores + "deleteById/" + id, httpOptions);
  }

}
