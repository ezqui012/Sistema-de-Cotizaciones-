//import { Rol } from './../Model/rol';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolDropdownService {

  constructor(private httpClient: HttpClient) { }
 /* getRoles():Observable<Rol[]>{
    return this.httpClient.get<Rol[]>('http://127.0.0.1:8000/api/rol');
  }*/
}
