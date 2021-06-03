import { environment } from '../../environments/environment';
import { Registeruser, updateUserData, UpdatePassword } from './../Model/registeruser';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private httpClient: HttpClient) { }

  updateData(id: any, user: updateUserData):Observable<Registeruser | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.put<Registeruser | any>(`${environment.URI_API}updateUser/${id}`, user ,{ headers: httpHeader });
    }
    return failed;
    //return this.httpClient.put<Registeruser>('http://127.0.0.1:8000/api/updateUser/'+id, user);
  }
  changePassword(id: any, password: any):Observable<UpdatePassword>{
    let failed: any;

    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.put<UpdatePassword>(`${environment.URI_API}updatePassword/${id}`, password, {headers: httpHeader});
    }
    return failed;
    //return this.httpClient.put<UpdatePassword>('http://127.0.0.1:8000/api/updatePassword/'+id,password);
  }


}
