import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etiqueta } from '../models/Etiqueta';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})

export class EtiquetasService {
  urlEtiquetas = 'http://localhost:3000/etiquetas/';
  constructor(
    private http: HttpClient,
  ) { }

//metodo de tipo POST que ataca al controller de la API
addEtiqueta(etiqueta: Etiqueta): Observable<Etiqueta> {
  return this.http.post<Etiqueta>(this.urlEtiquetas+"postEtiqueta", etiqueta, httpOptions);
}

//GET a todas las etiquetas 

getAllEtiquetas(): Observable<Etiqueta[]> {
  return this.http.get<Etiqueta[]>(this.urlEtiquetas);
}


}
