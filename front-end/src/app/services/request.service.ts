import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RequestList } from '../Model/request';
import { DateExpenseItem } from '../Model/expenseItem';

@Injectable({
  providedIn: 'root'
})
export class RequestQuoteService {


  constructor(private httpClient: HttpClient) { }

allRequestQuote(): Observable<RequestList | any> {
  let failed: any;
  if (localStorage.getItem('quot-umss-tk')) {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.get<RequestList>(`${environment.URI_API}request`, { headers: httpHeader });
  }
  return failed;
}
allItem(): Observable<DateExpenseItem | any> {
  let failed: any;
  if (localStorage.getItem('quot-umss-tk')) {
    const httpHeader = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    });
    return this.httpClient.get<DateExpenseItem>(`${environment.URI_API}expense-item`, { headers: httpHeader });
  }
  return failed;
}
}
