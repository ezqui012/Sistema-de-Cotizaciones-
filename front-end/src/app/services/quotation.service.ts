import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ListAssignedQuotes } from '../Model/quotation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getListQuotes(id: any):Observable<ListAssignedQuotes | any>{
    let failed: any;

    // if(localStorage.getItem('quot-umss-tk')){
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<ListAssignedQuotes>(`${environment.URI_API}quot-assigned/${id}`, {headers: httpHeader});
    // }
    return this.httpClient.get<ListAssignedQuotes>(`${environment.URI_API}quot-assigned/${id}`);
  }

  getNumberQuotesItem(id_quotation: any, id_item: any):Observable<any>{
    let failed: any;

    // if(localStorage.getItem('quot-umss-tk')){
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<any>(`${environment.URI_API}get-numberQuotes/${id_request}/${id_item}`, {headers: httpHeader});
    // }
    return this.httpClient.get<any>(`${environment.URI_API}get-numberQuotes/${id_quotation}/${id_item}`);
  }

}
