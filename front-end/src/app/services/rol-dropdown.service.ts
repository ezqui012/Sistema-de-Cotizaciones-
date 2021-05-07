import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Rol } from '../Model/rol';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RolDropdownService {

  constructor(private httpClient: HttpClient) { }
  getRoles():Observable<Rol[]>{
     let failed: any;
     if(localStorage.getItem('quot-umss-tk')){
       const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
       return this.httpClient.get<Rol[]>(`${environment.URI_API}roles`, {headers: httpHeader});
     }
    return failed;


   // return this.httpClient.get<Rol[]>('http://127.0.0.1:8000/api/rol');

  }

}
