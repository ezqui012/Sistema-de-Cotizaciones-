import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { QuoteList, ResponseQuote, ItemQuotes, ItemQuoteAcepted} from '../Model/quoteModel';
import { ExpenseItems } from '../Model/expenseItem';


@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private httpClient: HttpClient) { }
  getQuoteFinish(): Observable<QuoteList | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<QuoteList>(`${environment.URI_API}quote`, {headers: httpHeader});
    }
    return failed;
  }

  getItemsRequest(idRequest:any): Observable<ExpenseItems | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<ExpenseItems>(`${environment.URI_API}quoteItem/${idRequest}`, {headers: httpHeader});
    }
    return failed;
  }
  getItemsQuotes(idQuote:any, idItem:any): Observable<ItemQuotes | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<ItemQuotes>(`${environment.URI_API}itemQuotes/${idQuote}/${idItem}`, {headers: httpHeader});
    }
    return failed;
  }
  getItemsRequestSync(idRequest:any): Observable<ExpenseItems | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<ExpenseItems>(`${environment.URI_API}quoteItem/${idRequest}`, {headers: httpHeader});
    }
    return failed;
  }
  getItemsQuotesSync(idQuote:any, idItem:any): Observable<ItemQuotes | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<ItemQuotes>(`${environment.URI_API}itemQuotes/${idQuote}/${idItem}`, {headers: httpHeader});
    }
    return failed;
  }
  deleteItmesQuoteAccepted(idRequest:any): Observable<ResponseQuote | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.delete<ResponseQuote>(`${environment.URI_API}quote/${idRequest}`, {headers: httpHeader});
    }
    return failed;
  }


  registerItemQuoteAccepted(register:ItemQuoteAcepted):Observable<ResponseQuote|any>{
    let failed: any;

    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });

      return this.httpClient.post<ResponseQuote>(`${environment.URI_API}quote`, register, {headers: httpHeader});
    }
    return failed;
  }
  putStateQuote(idQuote:number, status:string): Observable<ResponseQuote | any>{
    console.log("de servicios.. idQ: "+idQuote)
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.put<ResponseQuote>(`${environment.URI_API}updateStatusQ/${idQuote}/${status}`,{}, {headers: httpHeader});
    }
    return failed;
  }
  putStateRequestQuote(idRequest:number, status:string): Observable<ResponseQuote | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.put<ResponseQuote>(`${environment.URI_API}updateStatusR/${idRequest}/${status}`,{}, {headers: httpHeader});
    }
    return failed;
  }
}
