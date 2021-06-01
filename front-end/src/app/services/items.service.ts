import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RegisterItemModel, ResponseItem, ExpenseItem } from '../Model/expense-item';

@Injectable({
  providedIn: 'root'
})

export class ItemsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getAllTypesItems(): Observable<any> {
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<any>(`${environment.URI_API}get-type-item`, { headers: httpHeader });
    }
    return failed;
  }

  getAllUnitsItems(): Observable<any> {
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<any>(`${environment.URI_API}get-unit-item`, { headers: httpHeader });
    }
    return failed;
  }

  insertItem(item: RegisterItemModel):Observable<ResponseItem | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.post<ResponseItem>(`${environment.URI_API}expense-item`, item, { headers: httpHeader });
    }
    return failed;
  }

  getInfoItem(id: any): Observable<ExpenseItem | any> {
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<ExpenseItem>(`${environment.URI_API}expense-item/${id}`, { headers: httpHeader });
    }
    return failed;
  }

}
