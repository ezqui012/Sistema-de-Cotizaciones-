import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registeruser } from '../Model/registeruser';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})


export class RegisteruserService {


  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line: typedef
  insertData(data: Registeruser): Observable<Registeruser>{
    console.log(data.name);
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.post
      <Registeruser>(`${environment.URI_API}registerUser`, data , {headers: httpHeader});
    }
    return failed;
    //return this.httpClient.post<Registeruser>('http://127.0.0.1:8000/api/registerUser', data);

  }
  getEmail(data: any){
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.post<Registeruser>(`${environment.URI_API}email`, {'email': data} ,
       {headers: httpHeader});
    }
    return failed;

      //return this.httpClient.post<Registeruser>('http://127.0.0.1:8000/api/email', {'email':data});
  }
  getCi(data:any){
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.post
      <Registeruser>(`${environment.URI_API}ci`, {'ci':data} , {headers: httpHeader});
    }
    return failed;
   // return this.httpClient.post<Registeruser>('http://127.0.0.1:8000/api/ci', {'ci':data});
  }
  getName(data:any){
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.post
      <Registeruser>(`${environment.URI_API}name`, {'name':data} , {headers: httpHeader});
    }
    return failed;
  }
}

