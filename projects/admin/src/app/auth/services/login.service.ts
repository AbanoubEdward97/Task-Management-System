import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../context/DTOs';
import { environment } from 'projects/admin/src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  login(model:Login){
    return this.http.post( environment.baseApi.replace("tasks","auth") + "/login",model)
  }
}




//we need to display the user in the table 
// create a function named formulateTasks in the list-tasks component
//this function changes the returning task object : why ?? 
//because the task to be displayed in the table need to have username along with title,description,deadline and status