import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Enterprise } from '../Model/enterprise';
import { ItemRequest } from '../Model/expense-item';
import { InfoEquestQuotation } from '../Model/quotation';

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

  getItems(id:any): Observable<ItemRequest | any>{
    // let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<ItemRequest>(`${environment.URI_API}items-rq/${id}`, { headers: httpHeader });
    // }
    // return failed;
    return this.httpClient.get<ItemRequest>(`${environment.URI_API}items-rq/${id}`);
  }

  getInfoQuote(id:any): Observable<InfoEquestQuotation | any>{
    // let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<InfoEquestQuotation>(`${environment.URI_API}quot-infoStatus/${id}`, { headers: httpHeader });
    // }
    // return failed;
    return this.httpClient.get<InfoEquestQuotation>(`${environment.URI_API}quot-infoStatus/${id}`);
  }

}
