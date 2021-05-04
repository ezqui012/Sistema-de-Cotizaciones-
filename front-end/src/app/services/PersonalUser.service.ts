import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permit, RegisterPermitResponse, Register_Permit } from '../Model/permit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PersonalUserService {


  constructor(private httpClient: HttpClient) { }

allPersonal(): Observable<Permit | any> {
  let failed: any;
  if (localStorage.getItem('quot-umss-tk')) {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.get<Permit>(`${environment.URI_API}personal`, { headers: httpHeader });
  }
  return failed;
}


}
