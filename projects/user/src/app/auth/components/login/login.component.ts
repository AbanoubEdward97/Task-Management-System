import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Login } from '../../Context/Dtos';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private toaster:ToastrService,private service:LoginService,private router:Router,private spinner:NgxSpinnerService ) { 
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.loginForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.minLength(3),Validators.maxLength(20)]],
      role:["user"]
    })
  }
  login(){
    this.service.login(this.loginForm.value).subscribe({
      next:(res:any)=>{
        this.toaster.success("Logined Successfully");
        localStorage.setItem("token",res.token);
        this.router.navigate(['/tasks']);
      },
      error:err=>{
        this.toaster.error(err.error.message);
      }
    });
  }
  
}
