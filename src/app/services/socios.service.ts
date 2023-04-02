import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Socio } from '../models/Socio';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};



@Injectable({
  providedIn: 'root'
})
export class SociosService {
  urlSocios = 'http://localhost:3000/socios/'
  constructor(
    private http: HttpClient,
  ) { }



  getSocios():Observable<Socio[]> {
    return this.http.get<Socio[]>(this.urlSocios+"getAll", httpOptions).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }


  //metodo de tipo POST que ataca al controller de la API
  addSocio(socio: Socio): Observable<Socio> {
    return this.http.post<Socio>(this.urlSocios+"postSocio", socio, httpOptions);
  }

  deleteById(id: String): Observable<Socio> {
    return this.http.delete<Socio>(this.urlSocios + "deleteById/" + id, httpOptions);
  }

  updateById(socio: Socio): Observable<Socio> {
    console.log(socio.idsocio)
     return this.http.put<Socio>(this.urlSocios + "updateById/" + socio.idsocio, socio, httpOptions);
  }

}
