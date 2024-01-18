import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Register } from '../Context/Dtos';
import { environment } from 'projects/user/src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  createAccount(model:Register){
    return this.http.post(environment.baseApi.replace("tasks","auth/") + "createAccount" ,model);
  }
  login(model:Login){
    return this.http.post(environment.baseApi.replace("tasks","auth/") + "login",model);
  }
}
