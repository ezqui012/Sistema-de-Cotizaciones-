import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CompanyList, ResponseRegister } from '../Model/companyList';

@Injectable({
  providedIn: 'root'
})
export class CompanyListService{

  constructor(
    private httpClient: HttpClient
  ) { }


  allListCompany(): Observable<ResponseRegister | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<ResponseRegister>(`${environment.URI_API}companyList`, { headers: httpHeader });
    }
    return failed;
  }
}
