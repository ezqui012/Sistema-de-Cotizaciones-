import { Unit } from '../Model/unit';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private httpClient: HttpClient) { }
  getUnits(): Observable<Unit[]>{
    return this.httpClient.get<Unit[]>('http://127.0.0.1:8000/api/unit');
  }


}
