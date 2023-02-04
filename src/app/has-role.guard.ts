import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HasRoleGuard implements CanActivate {


  constructor(private authService: AuthService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized = this.authService.user.roles.includes(route.data.role);
    if(! isAuthorized) {
      //redirigimos por ejemplo
      window.alert('No está autorizado');
    }
    return isAuthorized;
  }
}
