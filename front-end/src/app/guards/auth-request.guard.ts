import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthRequestGuard implements CanActivate {

  constructor(
    private router:Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let permission = JSON.parse("[" + localStorage.getItem('quot-umss-pa') + "]");
      if(localStorage.getItem('quot-umss-tk') && localStorage.getItem('quot-umss-p') !== '1' &&  permission.includes(4)
          &&  permission.includes(5) &&  permission.includes(6)){
        return true;
      }else{
        this.router.navigate(['/home-user']);
        return false;
      }
  }

}
