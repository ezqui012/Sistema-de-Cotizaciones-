import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisteruserService {

  constructor(private httpClient:HttpClient) { }

  getData(){
      return this.httpClient.get('127.0.0.1:8000/api/register');
  }
  insertData(){
      return this.httpClient.get('127.0.0.1:8000/api/register');
  }
}
