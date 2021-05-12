import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EditUserService {

  constructor(private httpClient: HttpClient) { }

  updateData(id: any,data: any){
    return this.httpClient.patch('http://127.0.0.1:8000/updateUser/'+id,+data);
  }


}
