import { environment } from './../../environments/environment.prod';
import { Registeruser, updateUserData, UpdatePassword } from './../Model/registeruser';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private httpClient: HttpClient) { }

  updateData(id: any, user: updateUserData):Observable<Registeruser>{
    return this.httpClient.put<Registeruser>('http://127.0.0.1:8000/api/updateUser/'+id, user);
  }
  changePassword(id: any, password: any):Observable<UpdatePassword>{
    return this.httpClient.put<UpdatePassword>('http://127.0.0.1:8000/api/updatePassword/'+id,password);
  }


}
