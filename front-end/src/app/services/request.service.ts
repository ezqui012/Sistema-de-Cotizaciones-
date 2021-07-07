import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterRequestResponse, RequestList, RequestQuotation, ItemRequest } from '../Model/request';
import { DateExpenseItem } from '../Model/expenseItem';
//import { ItemRequest } from '../Model/expense-item';

@Injectable({
  providedIn: 'root'
})
export class RequestQuoteService {


  constructor(private httpClient: HttpClient) { }
  allRequestQuote(idF: any, idU:any): Observable<RequestList | any> {
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<RequestList>(`${environment.URI_API}request/${idF}/${idU}`, { headers: httpHeader });
    }
    return failed;
  }

  allItem(statusData:string): Observable<DateExpenseItem | any> {
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<DateExpenseItem>(`${environment.URI_API}itemList/${statusData}`, { headers: httpHeader });
    }
    return failed;
  }
  updateStatusData(id:number, status:string): Observable<DateExpenseItem | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.put<DateExpenseItem>(`${environment.URI_API}itemStatusUp/${id}/${status}`,{}, {headers: httpHeader});
    }
    return failed;
  }
  registerRequestQuotation(request: RequestQuotation): Observable<RegisterRequestResponse | any> {
    let failed: any;

    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });

      return this.httpClient.post<RegisterRequestResponse>(`${environment.URI_API}request-quotation`, request, { headers: httpHeader });
    }
    return failed;
  }
  registerItemRequestQuotation(requestItem: ItemRequest): Observable<RegisterRequestResponse | any> {
    let failed: any;

    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });

      return this.httpClient.post<RegisterRequestResponse>(`${environment.URI_API}detail-request`, requestItem, { headers: httpHeader });
    }
    return failed;
  }

  getNameRequest(id: any): Observable<RegisterRequestResponse | any> {
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<RegisterRequestResponse>(`${environment.URI_API}detail-request/${id}`, { headers: httpHeader });
    }
    return failed;
  }
  updateNameRequest(id: any, request: any): Observable<RegisterRequestResponse | any> {
    let failed: any;

    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
        //console.log("haber")
      return this.httpClient.put<RegisterRequestResponse>(`${environment.URI_API}request_up/${id}/${request}`,{}, { headers: httpHeader });
    }
    return failed;
  }

  recoverListItemRequest(id: any): Observable<RegisterRequestResponse | any> {
    let failed: any;

    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });

      return this.httpClient.get<RegisterRequestResponse>(`${environment.URI_API}items-request/${id}`, { headers: httpHeader });
    }
    return failed;
  }

  removerListItemRequest(id: any): Observable<RegisterRequestResponse | any> {
    let failed: any;

    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });

      return this.httpClient.delete<RegisterRequestResponse>(`${environment.URI_API}detail-request/${id}`, { headers: httpHeader });
    }
    return failed;
  }



}
