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
    return this.httpClient.post<Company>('http://127.0.0.1:8000/api/enterprise', data);
  }
  getSectorEnterprise():Observable<any> {
    return this.httpClient.get<any>('http://127.0.0.1:8000/api/getSectorEnterprise');
  }
  getEnterpriseList():Observable<any>{
    return this.httpClient.get<any>('http://127.0.0.1:8000/api/getEnterprises');
  }
  getAllSectors():Observable<any>{
    return this.httpClient.get<any>('http://127.0.0.1:8000/api/sector-enterprise');
  }


}
