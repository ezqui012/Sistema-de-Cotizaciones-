import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Unit, SpendingUnit, RegisterUnitResponse } from '../Model/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private httpClient: HttpClient) { }
  getUnits(): Observable<Unit[]>{
    return this.httpClient.get<Unit[]>('http://127.0.0.1:8000/api/unit');
  }


  registerUnit(unit: Unit|SpendingUnit):Observable<RegisterUnitResponse | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });

      return this.httpClient.post<RegisterUnitResponse>(`${environment.URI_API}unit`, unit, {headers: httpHeader});
    }
    return failed
  }

}
