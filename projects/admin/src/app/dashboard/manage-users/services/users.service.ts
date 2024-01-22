import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }
  getAllUsers(filter:any){
    return this.http.get(environment.baseApi.replace('tasks','auth') + '/users')
  }
  deleteUser(id:string){
    return this.http.delete(environment.baseApi.replace('tasks',"auth") + '/user' + id )
  }
}
