import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login, LoginResponse } from '../Model/login';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  private async loginServe(credentials: Login): Promise<Observable<LoginResponse>>{
    return this.httpClient.post<LoginResponse>(`${environment.URI_API}login`, credentials);
  }

  // logout(){
  //   if(localStorage.getItem('quot-umss-tk')){
  //     const httpHeader = new HttpHeaders({
  //       'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
  //     });

  //   }
  // }

  async authentication(credentials: Login): Promise<boolean>{
    let res:LoginResponse;
    let logged = false;
    (await this.loginServe(credentials)).subscribe(
      (data) => {
        res = data;
        if (res.res == true) {
          this.saveToken(res.token);
          console.log(`token ${res.token}`);
          logged = true;
        }else if(res.res == false){
          logged = false;
          console.log('nelpastel')
        }
      }
    );
    return logged;
  }

  private async saveToken(token: string): Promise<void>{
   localStorage.setItem('quot-umss-tk', token);
  }

}
