import { Quote } from '../Model/Quote';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuoteProcessService {

  constructor(private httpClient:HttpClient) {}

  getQuoteProcess(id:any):Observable<Quote | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<Quote>(`${environment.URI_API}processQuote/${id}`, { headers: httpHeader });
    }
    return failed;
  }
  getQuoteFinalized(id:any):Observable<Quote | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<Quote>(`${environment.URI_API}finalizedQuote/${id}`, { headers: httpHeader });
    }
    return failed;
  }

  deleteProcess(id:any):Observable<Quote>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.delete<Quote>(`${environment.URI_API}processQuoteDelete/${id}`, { headers: httpHeader });
    }
    return failed;
   }
}
