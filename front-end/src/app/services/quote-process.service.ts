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
    return this.httpClient.get<Quote>('http://127.0.0.1:8000/api/processQuote/'+id);
  }
  getQuoteFinalized(id:any):Observable<Quote | any>{
    return this.httpClient.get<Quote>('http://127.0.0.1:8000/api/finalizedQuote/'+id);
  }
  deleteProcess(id:any):Observable<Quote>{
    return this.httpClient.delete<Quote>('http://127.0.0.1:8000/api/processQuote/'+id);
  }
}
