import { List } from '../Model/list';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ListService{
constructor(private http:HttpClient) { }


  getAll() : Observable<List[]>{
      return this.http.get<List[]>('http://127.0.0.1:8000/api/list'); 
  }

  getOne(id: number){
    this.http.get('http://127.0.0.1:8000/api/list'+id); 
}
  post(list: List){
    this.http.post('http://127.0.0.1:8000/api/list',list)
}
  put(id:number, list:List){
    this.http.put('http://127.0.0.1:8000/api/list'+id, list); 
}
delete(id:number){
    this.http.delete('http://127.0.0.1:8000/api/list'+id); 
}

}