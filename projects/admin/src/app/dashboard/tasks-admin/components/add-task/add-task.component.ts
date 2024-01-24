import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { HashLocationStrategy } from '@angular/common';
import { UsersService } from '../../../manage-users/services/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private fb:FormBuilder ,
    public dialog: MatDialogRef<AddTaskComponent> ,
    public matDialog:MatDialog,
    private service:TasksService,
    private toaster:ToastrService,
    private spinner:NgxSpinnerService,
    private userService:UsersService
    ) {this.getDataFromSubject() }
  newFormGroup!:FormGroup;
  imgPath!:string;
  oldFormValues:any;
  hasChanged:boolean=false;
  users:any = []

  ngOnInit(): void {
    console.log(this.data);
    this.createForm();
  }
  getDataFromSubject(){
    this.userService.userData.subscribe({
      next:(res:any)=>{
        this.users=this.usersMapping(res.data);
      }
    })
  }
  usersMapping(data:any[]){
    let newArray = data?.map(item=>{
      return {
        name:item.username,
        id:item._id
      }
    })
    return newArray;
  }
  createForm(){
    this.newFormGroup = this.fb.group({
      title:[this.data?.title || '',[Validators.required,Validators.minLength(5)]],
      userId:[this.data?.userId._id || '',Validators.required],
      deadline:[ this.data ? new Date(this.data?.deadline.replace(/(\d+)-(\d+)-(\d+)/, '$3-$2-$1')).toISOString() : '',Validators.required],
      description:[this.data?.description || '',Validators.required],
      image:[this.data?.image || '',Validators.required],
    })
    //console.log(new Date(this.data?.deadline.replace(/(\d+)-(\d+)-(\d+)/, '$3-$2-$1')).toISOString())
    //console.log(this.data?.deadline)
    //console.log(this.data?.deadline.replace(/(\d+)-(\d+)-(\d+)/, '$3-$2-$1'))
    //moment(this.data?.deadline).format("YYYY-MM-DDTHH:mm:ss.SSSZ")
    this.oldFormValues=this.newFormGroup.value;
  }

  createTask(){
    ;
    let model = this.prepareFormData();
    console.log(this.newFormGroup.value)
    this.service.addTask(model).subscribe({
      next:()=>{
        this.toaster.success("Task created Successfully");
        //
        this.dialog.close(true)
      },
    })
  }

  getImg(event:any){
    this.newFormGroup.get("image")?.setValue(event.target.files[0])//.image=event.target.files[0];
    console.log(this.newFormGroup)
    this.imgPath=event.target.value;
  }

  prepareFormData(){
    let newDate = moment(this.newFormGroup.value["deadline"]).format("DD-MM-YYYY");
    let formData = new FormData()
    Object.entries(this.newFormGroup.value).forEach(([key,value]:any)=>{
      if(key == "deadline"){
        formData.append(key,newDate);
      }else{
        formData.append(key,value);
      }
    })
    return formData;
  }

  updateTask(){
    //"";
    let model = this.prepareFormData();
    this.service.updateTask(model,this.data._id).subscribe({
      next:(res:any)=>{
        this.toaster.success("Task updated Successfully");
        //
        this.dialog.close(true);
      },
    })
  }
  close(){
    Object.keys(this.oldFormValues).forEach((key)=>{
      if(this.oldFormValues[key] !== this.newFormGroup.value[key]){
        this.hasChanged = true;
      }
    })
    if(this.hasChanged){
        //show the popup
        const dialogRef = this.matDialog.open(ConfirmationComponent, {
          width:'750px',
        });
        dialogRef.afterClosed().subscribe((result:any) => {
        });
    }else{
      this.dialog.close();
    }
  }
}
