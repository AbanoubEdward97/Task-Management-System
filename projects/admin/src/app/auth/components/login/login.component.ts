import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import {Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private toastr:ToastrService,private service:LoginService,private router:Router,private spinner:NgxSpinnerService) { 

  }

  ngOnInit(): void {
    this.createForm();
  }
  createForm():void{
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]],
      role:['admin']
    })
  }
  login():void{
    this.service.login(this.loginForm.value).subscribe({
      next: (res:any)=> {this.toastr.success("success","Login Success");
      localStorage.setItem("token",res.token);
      this.router.navigate(['/tasks']);this.spinner.hide()},
    });
  }
}
// res=>{
//   this.toaster.success("success","Login Success");
// },error=>{
//   this.toaster.error(error.error);
// }