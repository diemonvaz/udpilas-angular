import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'access_token';
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  urlUsuarios = 'http://localhost:3000/usuarios/';

  get token() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private http: HttpClient) { 
    //tenemos que asegurarnos de que el token no haya expirado antes de cambiar el estado de loggedIn en esta linea
    this._isLoggedIn$.next(!!this.token);
  }

 
  //metodo de tipo POST para hacer registro del usuario
  registro(email: string, password: string) {
    return this.http.post(this.urlUsuarios + 'registro', { email, password }, httpOptions);
  }


 //metodo de tipo POST para hacer login del usuario
 login(email: string, password: string) {
  return this.http.post(this.urlUsuarios + 'login', { email, password }, httpOptions).pipe(
    tap((response: any) => {
      this._isLoggedIn$.next(true);
      localStorage.setItem(this.TOKEN_NAME, response.access_token);
    })
  );
}

}
