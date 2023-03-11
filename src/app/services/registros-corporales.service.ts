import { RegistroCorporal } from './../models/RegistroCorporal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class RegistrosCorporalesService {

  urlRegCorporales = 'http://localhost:3000/registros_corporales/';
  constructor(private http: HttpClient) { }

  nuevoRegistroCorporal(idjugador: string, altura: Number, peso: Number, imc: Number, masa_muscular: Number, masa_osea: Number, tmb: Number,
    agua: Number, observaciones: string): Observable<RegistroCorporal> {
    return this.http.post<RegistroCorporal>(this.urlRegCorporales + 'registro', {idjugador, altura, peso, imc, masa_muscular, masa_osea, tmb,
      agua, observaciones}, httpOptions);
  }

}
