import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/admin/src/environments/environment';
import { BehaviorSubject } from 'rxjs';
export interface changeStatus{
  id:string,
  status:string
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  userData = new BehaviorSubject({});
  constructor(private http:HttpClient) { }
  getAllUsers(filter:any){
    let params = new HttpParams();
    if(filter){
      Object.entries(filter).forEach(([key,value]:any)=>{
        params = params.append(key,value)
      })
    }
    return this.http.get(environment.baseApi.replace('tasks','auth') + '/users',{params})
  }
  deleteUser(id:string){
    return this.http.delete(environment.baseApi.replace('tasks',"auth") + '/user/' + id )
  }
  changeStatus(model:changeStatus){
    return this.http.put(environment.baseApi.replace('tasks','auth') + '/user-status',model)
  }
  getUsersData(model?:any){
    this.getAllUsers(model).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.userData.next({
          data:res.users,
          total:res.totalItems
        })
      } 
    })
  }
}
