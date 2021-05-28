import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestDetail, ListItemsRequest, ResponseObtained, RejectedRequest, PersonalQuote } from '../Model/request-detail';
import { RegisterQuotation, ResponseQuotation } from '../Model/quotation';

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

  getActualAmount(id: any): Observable<any>{
    let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<RequestDetail>(`${environment.URI_API}items-request/${id}`, { headers: httpHeader });
    // }
    return this.httpClient.get<any>(`${environment.URI_API}unit-amount/${id}`);
  }

  registerRejected(data: RejectedRequest): Observable<ResponseObtained | any>{
    let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.post<ResponseObtained>(`${environment.URI_API}rejected`, data, { headers: httpHeader });
    // }
    return this.httpClient.post<ResponseObtained>(`${environment.URI_API}rejected`, data);
  }

  updateStatus(id: any, status: any): Observable<ResponseObtained | any>{
    let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.post<ResponseObtained>(`${environment.URI_API}update-status/${id}`, status, { headers: httpHeader });
    // }
    return this.httpClient.put<ResponseObtained>(`${environment.URI_API}update-status/${id}`, status);
  }

  getPersonalList(id: any): Observable< PersonalQuote | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<PersonalQuote>(`${environment.URI_API}list-personal/${id}`, { headers: httpHeader });
    }
    return failed;
  }

  registerQuotation(data: RegisterQuotation): Observable<ResponseQuotation | any>{
    let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.post<ResponseQuotation>(`${environment.URI_API}quotation`, data, { headers: httpHeader });
    // }
    return this.httpClient.post<ResponseQuotation>(`${environment.URI_API}quotation`, data);
  }
}
