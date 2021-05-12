import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Faculty, RegisterFacultyData, ResponseRegister } from '../Model/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  URL = "http://127.0.0.1:8000/api/faculties";

  constructor(private httpClient: HttpClient) { }

  allFaculties(): Observable<Faculty | any> {
    let failed: any;
    if (localStorage.getItem('quot-umss-tk')) {
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<Faculty>(`${environment.URI_API}faculties`, { headers: httpHeader });
    }
    return failed;
  }


  getFaculties(): Observable<Faculty> {
    return this.httpClient.get<Faculty>(this.URL);
  }
  registerFaculty(faculty: RegisterFacultyData):Observable<ResponseRegister | any>{
    let failed: any;

    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });

      return this.httpClient.post<ResponseRegister>(`${environment.URI_API}faculties`, faculty, {headers: httpHeader});
    }
    return failed;
  }

  getInfoFaculty(id: any):Observable<Faculty | any>{
    let failed: any;

    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.get<Faculty>(`${environment.URI_API}faculties/${id}`, {headers: httpHeader});
    }
    return failed;
  }

  updateFaculty(id:any, faculty: RegisterFacultyData):Observable<ResponseRegister | any>{
    let failed: any;

    if(localStorage.getItem('quot-umss-tk')){
      const httpHeader = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('quot-umss-tk')}`
      });
      return this.httpClient.put<ResponseRegister>(`${environment.URI_API}faculties/${id}`, faculty, {headers: httpHeader});
    }
    return failed;
  }

}
