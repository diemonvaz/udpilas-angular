import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Miembro } from '../models/Miembro';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class MiembrosService {
  urlMiembros = 'http://localhost:3000/miembros/';
  constructor(private http: HttpClient) {}

getMiembros():Observable<Miembro[]> {
  return this.http.get<Miembro[]>(this.urlMiembros+"getAll", httpOptions);
}

//metodo de tipo POST para hacer registro del usuario
registrarMiembro(email: string, password: string, nombre: string, apellidos: string, dni: string,
   poblacion: string, telefono: string, fecha_nacimiento: string, domicilio: string, roles: string[]): Observable<Response> {
  return this.http.post<Response>(this.urlMiembros + 'registro', { email, password, nombre, apellidos, dni, poblacion, telefono,
    fecha_nacimiento, domicilio, roles }, httpOptions);
}


}
