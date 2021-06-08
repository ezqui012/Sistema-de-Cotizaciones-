import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterQuoteDetail, ResponseRegisterQuote, AttachmentStore } from '../Model/quote-detail';

@Injectable({
  providedIn: 'root'
})
export class QuoteDetailService {

  constructor(private httpClient: HttpClient) { }

  insertQuote(quote: RegisterQuoteDetail): Observable<ResponseRegisterQuote | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.post<ResponseRegisterQuote>(`${environment.URI_API}insertQuote`, quote, { headers: httpHeader });
    }
    return failed;
  }

  showDetailQuote(id: number):Observable<RegisterQuoteDetail | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<RegisterQuoteDetail>(`${environment.URI_API}insertQuote/${id}`, { headers: httpHeader });
    }
    return failed;

  }

  updateDetailQuote(id: number, newData: RegisterQuoteDetail):Observable<ResponseRegisterQuote | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.put<ResponseRegisterQuote>(`${environment.URI_API}insertQuote/${id}`, newData, { headers: httpHeader });
    }
    return failed;
  }

  storeAttachmentBackend(data: AttachmentStore):Observable<any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.post<any>(`${environment.URI_API}attachment-routes`, data, { headers: httpHeader });
    }
    return failed;
  }

  storeAttachmentCloud(imgData: any):Observable<any>{
    let data = imgData;
    return this.httpClient.post<any>('https://api.cloudinary.com/v1_1/dmdp1bbnt/raw/upload', data);
  }

}
