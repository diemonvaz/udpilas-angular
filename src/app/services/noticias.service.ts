import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Noticia } from '../models/Noticia';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};


@Injectable({
  providedIn: 'root'
})



export class NoticiasService {
  urlPost = 'http://localhost:3000/noticias/';
  constructor(
    private http: HttpClient,
  ) {
      
  }


  //metodo de tipo POST que ataca al controller de la API
  addNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.urlPost+"postNoticia", noticia, httpOptions);
  }






}