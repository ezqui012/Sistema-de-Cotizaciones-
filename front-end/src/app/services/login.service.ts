import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, LoginResponse, LogoutResponse } from '../Model/login';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  loginServe(credentials: Login): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${environment.URI_API}login`, credentials);
  }

  logout(): Observable<LogoutResponse | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });

      return this.httpClient.post<LogoutResponse>(`${environment.URI_API}logout`, {}, {headers: httpHeader});
    }

    return failed;
  }
}
