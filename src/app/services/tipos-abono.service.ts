import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoAbono } from '../models/TipoAbono';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TiposCarnetService {
  urlTipos = 'http://localhost:3000/tipos_abono/';
  constructor(private http: HttpClient) {}





//GET a todos los tipos de carnet

getTipos():Observable<TipoAbono[]> {
  return this.http.get<TipoAbono[]>(this.urlTipos+"getAll", httpOptions);
}






}
