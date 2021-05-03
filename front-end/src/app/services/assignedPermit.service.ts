import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignedPermit, RegisterAssignedPermitResponse} from '../Model/assignedPermit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AssignedPermitService {


  constructor(private httpClient: HttpClient) { }

allPermit(): Observable<AssignedPermit | any> {
  let failed: any;
  if (localStorage.getItem('quot-umss-tk')) {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.get<AssignedPermit>(`${environment.URI_API}assignedPermit`, { headers: httpHeader });
  }
  return failed;
}

registerPermit(assignedPermit: AssignedPermit):Observable<RegisterAssignedPermitResponse | any>{
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
