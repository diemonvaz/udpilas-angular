import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpClient;
  let mockResponse: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    http = TestBed.inject(HttpClient);
    service = TestBed.inject(AuthService);
    mockResponse = {
      access_token: 'mock_token'
    };
    spyOn(http, 'post').and.returnValue(of(mockResponse)).and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call http post method with correct parameters to test Registro', () => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const email = 'test@test.com';
    const password = 'test1234';
    const roles = ['ROLPRUEBA'];

    service.registro(email, password, roles).subscribe(() => {
      expect(http.post).toHaveBeenCalledWith(service.urlUsuarios + 'registro', {email, password, roles}, httpOptions);
    });
  });

  it('should call http post method with correct parameters to test Login', () => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        Authorization: 'my-auth-token'
      })
    };
    const email = 'test@test.com';
    const password = 'test1234';
    service.login(email, password).subscribe(() => {
      expect(http.post).toHaveBeenCalledWith(service.urlUsuarios + 'login', {email, password}, httpOptions);
    });
  });

  it('should make a logout', () => {
    service.logout();
  });

  



});


