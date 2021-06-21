import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ListBudget, ResponseBudget, RegisterBudget, HistoryBudget } from '../Model/budget';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  constructor(private httpClient: HttpClient) { }

  listBudget(year: any):Observable<ListBudget | any>{
    // let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<ListBudget>(`${environment.URI_API}budget-list/${year}`, { headers: httpHeader });
    // }
    // return failed;
    return this.httpClient.get<ListBudget>(`${environment.URI_API}budget-list/${year}`);
  }

  historyBudget():Observable<ListBudget | any>{
    // let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<ListBudget>(`${environment.URI_API}budget`, { headers: httpHeader });
    // }
    // return failed;
    return this.httpClient.get<ListBudget>(`${environment.URI_API}budget`);
  }

  listAssigned(year: any):Observable<ListBudget | any>{
    // let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<ListBudget>(`${environment.URI_API}budget-listA/${year}`, { headers: httpHeader });
    // }
    // return failed;
    return this.httpClient.get<ListBudget>(`${environment.URI_API}budget-listA/${year}`);
  }

  assignedBudget(dataB: RegisterBudget):Observable<ResponseBudget | any>{
    // let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.post<ResponseBudget>(`${environment.URI_API}budget`, dataB, { headers: httpHeader });
    // }
    // return failed;
    return this.httpClient.post<ResponseBudget>(`${environment.URI_API}budget`, dataB);
  }

  listHistory(id: any):Observable<HistoryBudget | any>{
    // let failed: any;
    // if (localStorage.getItem('quot-umss-tk')) {
    //   const httpHeader = new HttpHeaders({
    //     'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
    //   });
    //   return this.httpClient.get<ListBudget>(`${environment.URI_API}budget-listH/${id}`, { headers: httpHeader });
    // }
    // return failed;
    return this.httpClient.get<HistoryBudget>(`${environment.URI_API}budget-listH/${id}`);
  }
}
