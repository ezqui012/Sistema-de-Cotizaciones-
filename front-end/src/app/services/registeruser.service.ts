import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Registeruser } from '../Model/registeruser';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})


export class RegisteruserService {


  constructor(private httpClient: HttpClient) { }

  // tslint:disable-next-line: typedef
  getData(){
      return this.httpClient.get('http://127.0.0.1:8000/api/register');
  }
  insertData(data: Registeruser): Observable<Registeruser>{
    console.log(data.name);
    return this.httpClient.post<Registeruser>('http://127.0.0.1:8000/api/registerUser', data);

  }
  getEmail(data: any){
      return this.httpClient.post<Registeruser>('http://127.0.0.1:8000/api/email', {'email':data});
  }
  getCi(data:any){
    return this.httpClient.post<Registeruser>('http://127.0.0.1:8000/api/ci', {'ci':data});
  }
}
