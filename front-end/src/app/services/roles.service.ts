
import { compilePipeFromMetadata } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Roles, Register_Role, RegisterRolesResponse } from '../Model/roles';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponseRegister } from '../Model/faculty';



@Injectable({
  providedIn: 'root'
})
export class RolesService {
  //URL = "http://127.0.0.1:8000/api/roles";

  constructor(private httpClient: HttpClient) { }
// getRole(): Observable<Roles[]>{
//  return this._http.get<Roles[]>(this.URL);
// }

allRoles(statusData:string): Observable<Roles | any> {
  let failed: any;
  if (localStorage.getItem('quot-umss-tk')) {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.get<Roles>(`${environment.URI_API}rolesList/${statusData}`, { headers: httpHeader });
  }
  return failed;
}
// addRole(name_role: string, description_role:string): Observable<any>{
//   const obj = new FormData();
//   obj.append("name_role", name_role);
//   obj.append("description_role", description_role);
//   return this._http.post(this.URL,obj)
// }
registerRoles(role: Register_Role):Observable<RegisterRolesResponse | any>{
  let failed: any;

  if(localStorage.getItem('quot-umss-tk')){
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });

    return this.httpClient.post<RegisterRolesResponse>(`${environment.URI_API}roles`, role, {headers: httpHeader});
  }
  return failed;
}

getRoleSelect(id:any): Observable<Roles | any> {
  //console.log("llego a servicios: " + id);
  let failed: any;
  if (localStorage.getItem('quot-umss-tk')) {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.get<Roles>(`${environment.URI_API}roleId/${id}`, { headers: httpHeader });
  }
  return failed;

}

updateRoleSelect(id:any, role: Register_Role):Observable<RegisterRolesResponse | any>{
  let failed: any;

  if(localStorage.getItem('quot-umss-tk')){
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.put<RegisterRolesResponse>(`${environment.URI_API}roles/${id}`, role, {headers: httpHeader});
  }
  return failed;
}
updateStatusData(id:number, status:string): Observable<RegisterRolesResponse | any>{
  let failed: any;
  if(localStorage.getItem('quot-umss-tk')){
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.put<RegisterRolesResponse>(`${environment.URI_API}statusDataUp/${id}/${status}`,{}, {headers: httpHeader});
  }
  return failed;
}
}
