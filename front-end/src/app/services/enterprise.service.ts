import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Enterprise } from '../Model/enterprise';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private httpClient: HttpClient) { }

  allEnterprise(): Observable<Enterprise | any>{
    // let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<Enterprise>(`${environment.URI_API}enterprise`, { headers: httpHeader });
    // }
    // return failed;
    return this.httpClient.get<Enterprise>(`${environment.URI_API}enterprise`);
  }

}
