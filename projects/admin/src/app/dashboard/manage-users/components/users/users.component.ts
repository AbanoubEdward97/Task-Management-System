import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsersService, changeStatus } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'email' ,'tasksAssigned', 'actions'];
  dataSource:any = [];
  page:any=1;
  limit:any=5;
  totalItems:any;
  users:any=[];
  constructor(private service:UsersService,private toaster:ToastrService) { 
   
  }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(){
    const model={
      page:this.page,
      limit:this.limit,
      name:''
    }
    this.service.getUsersData(model)
  }
  
  gty(event:any){
    console.log(event);
    this.page=event;
    this.getUser();
  }
  deleteUser(id:string,index:number){
    if(this.dataSource[index].assignedTasks > 0){
      this.toaster.error("Can't delete user since it has tasks in progress")
    }else{
      this.service.deleteUser(id).subscribe({
        next:(res:any)=>{
          this.toaster.success("User Deleted Successfully","success");
          this.page=1;
          this.getUser();
        },
        error:(err)=>{console.log(err);
        }
      })
    }
    
  }
  changeUserStatus(status:string,id:string,index:number){
    if(this.dataSource[index].assignedTasks > 0){
      this.toaster.error("Can't change user status since it has tasks in progress")
    }else{
      const model:changeStatus ={
        id,
        status
      }
      this.service.changeStatus(model).subscribe({
        next:(res:any)=>{
        this.toaster.success("Status changed successfully","success");
        this.page=1
        this.getUser();
        }
      })
    }
  }
}
