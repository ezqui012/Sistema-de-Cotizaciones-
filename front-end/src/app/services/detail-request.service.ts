import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestDetail, ListItemsRequest } from '../Model/request-detail';

@Injectable({
  providedIn: 'root'
})
export class DetailRequestService {

  constructor(
    private httpClient: HttpClient
  ) { }


  getInfoRequest(id: any): Observable<RequestDetail | any>{
    let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<RequestDetail>(`${environment.URI_API}request-quotation/${id}`, { headers: httpHeader });
    // }
    return this.httpClient.get<RequestDetail>(`${environment.URI_API}request-quotation/${id}`);
  }

  getItemsRequest(id: any): Observable<ListItemsRequest | any>{
    let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<RequestDetail>(`${environment.URI_API}items-request/${id}`, { headers: httpHeader });
    // }
    return this.httpClient.get<RequestDetail>(`${environment.URI_API}items-request/${id}`);
  }
}
