import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!:FormGroup;
  constructor(private fb:FormBuilder,private toaster:ToastrService) { 
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.loginForm = this.fb.group({
      email:['',Validators.required,Validators.email],
      password:['',Validators.minLength(3),Validators.maxLength(20)]
    })
  }
}
