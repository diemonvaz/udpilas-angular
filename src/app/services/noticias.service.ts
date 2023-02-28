import { NoticiaRequest } from '../models/NoticiaRequest';
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
  urlNoticias = 'http://localhost:3000/noticias/';
  constructor(
    private http: HttpClient,
  ) 
  {
      
  }


  //metodo de tipo POST que ataca al controller de la API
  addNoticia(noticia: Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.urlNoticias+"postNoticia", noticia, httpOptions);
  }

  getNoticias():Observable<NoticiaRequest[]> {
    return this.http.get<NoticiaRequest[]>(this.urlNoticias+"getAll", httpOptions);
  }

  getNoticiaById(id: String):Observable<NoticiaRequest> {
    return this.http.get<NoticiaRequest>(this.urlNoticias+"getById/" + id, httpOptions);
  }

  getNoticiaByTitulo(titulo: String):Observable<NoticiaRequest[]> {
    return this.http.get<NoticiaRequest[]>(this.urlNoticias+"getByTitulo/" + titulo, httpOptions);
  }

  getNoticiaByEtiqueta(etiqueta: String):Observable<NoticiaRequest[]> {
    return this.http.get<NoticiaRequest[]>(this.urlNoticias+"getByEtiqueta/" + etiqueta, httpOptions);
  }

  //metodo para rescatar las ultimas X noticias en BBDD
  getUltimasInsertadas(num: Number):Observable<NoticiaRequest[]> {
    return this.http.get<NoticiaRequest[]>(this.urlNoticias+"getUltimasInsertadas/" + num, httpOptions);
  }

  updateById(noticia: Noticia, id: String): Observable<Noticia> {
    return this.http.put<Noticia>(this.urlNoticias + "updateById/" + id, noticia, httpOptions);
 }

 deleteById(id: String): Observable<Response> {
  return this.http.delete<Response>(this.urlNoticias + "deleteById/" + id, httpOptions);
}
  
}