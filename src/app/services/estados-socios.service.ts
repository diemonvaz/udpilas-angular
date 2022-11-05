import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstadoSocio } from '../models/EstadoSocio';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class EstadosSociosService {

  urlEstadosSocios = 'http://localhost:3000/estados_socios/';
  constructor(private http: HttpClient) {}


  getEstados():Observable<EstadoSocio[]> {
    return this.http.get<EstadoSocio[]>(this.urlEstadosSocios+"getAll", httpOptions);
  }
  
}
