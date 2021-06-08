import { Company } from './../Model/company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpClient: HttpClient) { }
  insertData(data: Company): Observable<Company>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.post<Company>(`${environment.URI_API}enterprise`, data, { headers: httpHeader });
    }
    return failed;
    //return this.httpClient.post<Company>('http://127.0.0.1:8000/api/enterprise', data);
  }

  getAllSectors():Observable<any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<any>(`${environment.URI_API}sector-enterprise`, { headers: httpHeader });
    }
    return failed;
    //return this.httpClient.get<any>('http://127.0.0.1:8000/api/sector-enterprise');
  }
  getDataEnterpriseByID(id:any):Observable<any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<any>(`${environment.URI_API}enterprises/${id}`,  { headers: httpHeader });
    }
    return failed;
   //return this.httpClient.get<Company>('http://127.0.0.1:8000/api/enterprises/'+id);
  }
  update(id:any, company: Company):Observable<Company | any>{
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.put<Company>(`${environment.URI_API}updateEnterprise/${id}`, company, { headers: httpHeader });
    }
    return failed;
    //return this.httpClient.put('http://127.0.0.1:8000/api/updateEnterprise/'+id,company);
  }


}
