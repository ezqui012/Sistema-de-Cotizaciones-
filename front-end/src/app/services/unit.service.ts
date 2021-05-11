import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { UnitA, SpendingUnit, RegisterUnitResponse } from '../Model/unit';
import { Unit } from '../Model/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private httpClient: HttpClient) { }
  getUnits(): Observable<Unit[]>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<Unit[]>(`${environment.URI_API}unitDropdown`, {headers: httpHeader});
    }
    return failed;
  }


  registerUnit(unit: UnitA|SpendingUnit):Observable<RegisterUnitResponse | any>{
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
