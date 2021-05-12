
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { List, ListUnit, SpendingUnit } from '../Model/list';
@Injectable({
  providedIn: 'root'
})
export class ListService{

  constructor(private httpClient: HttpClient) { }

  gastoUnit(): Observable<ListUnit | any> {
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<ListUnit>(`${environment.URI_API}list?type=Gasto`, { headers: httpHeader });
    }
    return failed;

  }
  getUnitSelect(id:any): Observable<ListUnit | any> {
    console.log("llego a servicios: " + id);
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<ListUnit>(`${environment.URI_API}list/${id}`, { headers: httpHeader });
    }
    return failed;

  }
  adminUnit(): Observable<ListUnit | any> {
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<ListUnit>(`${environment.URI_API}list?type=Administrativa`, { headers: httpHeader });
    }
    return failed;

  }


  showList(list: ListUnit):Observable<SpendingUnit | any>{
    let failed: any;

    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });

      return this.httpClient.post<SpendingUnit>(`${environment.URI_API}Unit`, list, {headers: httpHeader});
    }
    return failed;
  }

}

