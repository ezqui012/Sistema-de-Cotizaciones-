import { HttpClient } from '@angular/common/http';
import { compilePipeFromMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles } from '../Model/roles';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  URL = "http://127.0.0.1:8000/api/roles";

  constructor(private _http: HttpClient) { }
getRole(): Observable<Roles[]>{
 return this._http.get<Roles[]>(this.URL);
}

addRole(name_role: string, description_role:string): Observable<any>{
  const obj = new FormData();
  obj.append("name_role", name_role);
  obj.append("description_role", description_role);
  return this._http.post(this.URL,obj)
}

}
