import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/Rol';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  urlRoles = 'http://localhost:3000/roles/';
  constructor(private http: HttpClient) { }

  getRoles():Observable<Rol[]> {
  return this.http.get<Rol[]>(this.urlRoles+"getAll", httpOptions);
  }

}
