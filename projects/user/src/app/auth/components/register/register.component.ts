import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArrayName, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private service:LoginService,private toaster:ToastrService,private router:Router) { }
  registerForm!:FormGroup;
  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.registerForm = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmPassword:['',[Validators.required]],
      username:['',[Validators.required]]
    },{validators:this.checkPassword})
  }
  createAccount(){
    const model = {
      email:this.registerForm.value["email"],
      password:this.registerForm.value["password"],
      confirmPassword:this.registerForm.value["confirmPassword"],
      username:this.registerForm.value["username"],
      role:'user'
    }
    this.service.createAccount(model).subscribe({
      next:res=>{
        this.toaster.success("Account created successfully!");
        this.router.navigate(['auth/login'])
      },
      error:err=>{
        this.toaster.error(err.error.message);
        console.log(this.registerForm);
        
      }
    })
  }
  checkPassword:ValidatorFn=(group:AbstractControl):ValidationErrors|null=>{
    let password = group.get("password")?.value;
    let confirmPassword = group.get("confirmPassword")?.value;
    return password === confirmPassword ? null : {notSame : true}
  }
}
