
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Backup } from '../Model/backup';
@Injectable({
  providedIn: 'root'
})
export class BackupService {

  constructor(
    private httpClient: HttpClient
  ) { }

    listCompany():Observable<Backup|any>{
      let failed: any;
      if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<Backup>(`${environment.URI_API}list-backup`, { headers: httpHeader });
      }
      return failed;
      //return this.httpClient.get('http://127.0.0.1:8000/api/list-backup/');
    }
    restoreBD(path:any):Observable<Backup|any>{
      let failed: any;
      if (localStorage.getItem('quot-umss-tk')) {
        const httpHeader = new HttpHeaders({
          'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
        });
      return this.httpClient.post<Backup>(`${environment.URI_API}restore`,path, {headers: httpHeader});
     }
     return failed;
    }
}
