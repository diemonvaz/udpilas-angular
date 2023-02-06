import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HasRoleGuard implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized = this.authService.user.roles.includes(route.data.role);
    if(! isAuthorized) {
      //alertamos y redirigimos por ejemplo
      window.alert('No está autorizado');
      this.router.navigate(['']);
    }
    return isAuthorized;
  }
}
