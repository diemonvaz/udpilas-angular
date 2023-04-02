import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Equipo } from '../models/Equipo';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  urlEquipos = 'http://localhost:3000/equipos/';

  constructor(private http: HttpClient) { }

  getEquipos():Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.urlEquipos+"getAll", httpOptions);
  }

  getEquiposAdm():Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.urlEquipos+"getAllAdm", httpOptions).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


}
