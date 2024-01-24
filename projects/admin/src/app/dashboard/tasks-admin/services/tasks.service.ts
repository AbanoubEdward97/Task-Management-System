import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTaskForm } from '../context/Dtos';
import { environment } from 'projects/admin/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class TasksService {
  userData: any;

  constructor(private http:HttpClient) { }
  getAllTasks(filter:any,page:any,itemsPerPage:number){
    let params = new HttpParams();
    // if(filter.keyword){
    //   params=params.append("keyword",filter.keyword)
    // }
    // if(filter.userId){
    //   params = params.append("userId",filter.userId);
    // }
    Object.entries(filter).forEach(([key,value]:any)=>{
      if(filter[key]){
        params=params.append(key,value)
      }
    })
    return this.http.get(environment.baseApi + `/all-tasks?page=${page}&limit=${itemsPerPage}`,{params});
  }

  addTask(model:any){
    return this.http.post( environment.baseApi + "/add-task",model)
  }

  deleteTask(id:any){
    return this.http.delete(environment.baseApi + "/delete-tasks/" + id)
  }
  updateTask(model:any,id:any){
    return this.http.put(environment.baseApi + "/edit-task/" + id,model)
  }
}
