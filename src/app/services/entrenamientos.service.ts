import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrenamiento } from '../models/Entrenamiento';
import { Jugador } from '../models/Jugador';
import { Miembro } from '../models/Miembro';
import { Usuario } from '../models/Usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class EntrenamientosService {

  urlEntrenamientos = 'http://localhost:3000/entrenamientos/';

  constructor(private http: HttpClient) { }

  getEntrenamientos():Observable<Entrenamiento[]> {
    return this.http.get<Entrenamiento[]>(this.urlEntrenamientos+"getAll", httpOptions);
  }

  //aqui en el servicio recibe el usuario que ha hecho el entreno, el que lo registra en la app. En backend, se coge el miembro asociado y se crea la relación con él.
  nuevoEntrenamiento(idusuario: String, fecha: String, observaciones: String, jugadores: Jugador[], idequipo:String): Observable<Entrenamiento> {
    return this.http.post<Entrenamiento>(this.urlEntrenamientos + 'registro', {idusuario, fecha, observaciones, jugadores, idequipo}, httpOptions);
  }

  deleteById(id: String): Observable<Response> {
    return this.http.delete<Response>(this.urlEntrenamientos + "deleteById/" + id, httpOptions);
  }


}
