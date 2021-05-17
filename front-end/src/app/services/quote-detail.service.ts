import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterQuoteDetail, ResponseRegisterQuote } from '../Model/quote-detail';

@Injectable({
  providedIn: 'root'
})
export class QuoteDetailService {

  constructor(private httpClient: HttpClient) { }

  insertQuote(quote: RegisterQuoteDetail): Observable<ResponseRegisterQuote | any>{
    // let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.post<ResponseRegisterQuote>(`${environment.URI_API}insertQuote`, quote, { headers: httpHeader });
    // }
    // return failed;
    return this.httpClient.post<ResponseRegisterQuote>(`${environment.URI_API}insertQuote`, quote);
  }

}
