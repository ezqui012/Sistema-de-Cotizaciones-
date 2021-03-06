import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignedPermit, PermitOfRole, RegisterAssignedPermitResponse} from '../Model/assignedPermit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { analyzeAndValidateNgModules } from '@angular/compiler';



@Injectable({
  providedIn: 'root'
})
export class AssignedPermitService {


  constructor(private httpClient: HttpClient) { }

allAssignedPermit(): Observable<AssignedPermit | any> {
  let failed: any;
  if (localStorage.getItem('quot-umss-tk')) {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.get<AssignedPermit>(`${environment.URI_API}assignedPermit`, { headers: httpHeader });
  }
  return failed;
}

allPermitOfRole(idRole:any): Observable< PermitOfRole| any> {
  let failed: any;
  if (localStorage.getItem('quot-umss-tk')) {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.get<PermitOfRole>(`${environment.URI_API}assignedPermit/${idRole}`, { headers: httpHeader });
  }
  return failed;
}

deletePermitAssigned(idRole:any):Observable<RegisterAssignedPermitResponse | any>{
  let failed: any;
  if (localStorage.getItem('quot-umss-tk')) {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.delete<RegisterAssignedPermitResponse>(`${environment.URI_API}assignedPermit/${idRole}`, { headers: httpHeader });
  }
  return failed;
}

registerAssignedPermit(assignedPermit: AssignedPermit):Observable<RegisterAssignedPermitResponse | any>{
  let failed: any;

  if(localStorage.getItem('quot-umss-tk')){
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });

    return this.httpClient.post<RegisterAssignedPermitResponse>(`${environment.URI_API}assignedPermit`, assignedPermit, {headers: httpHeader});
  }
  return failed;
}

}
