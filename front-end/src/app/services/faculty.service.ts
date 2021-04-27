import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Faculty } from '../Model/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {


  constructor(private httpClient: HttpClient) { }

  allFaculties(): Observable<Faculty | any>{
    let failed: any;
    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<Faculty>(`${environment.URI_API}faculties`, {headers: httpHeader});
    }
    return failed;
  }

}