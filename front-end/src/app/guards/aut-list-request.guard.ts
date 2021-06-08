import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AutListRequestGuard implements CanActivate {

  constructor(
    private router:Router,
    public toastr: ToastrService
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let permission = JSON.parse("[" + localStorage.getItem('quot-umss-pa') + "]");
      if(localStorage.getItem('quot-umss-tk') && localStorage.getItem('quot-umss-p') !== '1' &&  permission.includes(6)){
        return true;
      }else{
        this.router.navigate(['/home-user']);
        this.toastr.error('Usted no cuenta con permisos para ver la lista de solicitudes');
        return false;
      }
  }

}
