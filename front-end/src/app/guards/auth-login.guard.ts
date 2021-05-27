import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {

  constructor(
    private router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(!localStorage.getItem('quot-umss-tk')){
      return true;
    }else if(localStorage.getItem('quot-umss-tk') && localStorage.getItem('quot-umss-p') === '1'){
      this.router.navigate(['']);
      return false;
    }else{
      //aqui los otros usuarios
      //this.router.navigate(['/home-user']);
      return false;
    }

  }

}
