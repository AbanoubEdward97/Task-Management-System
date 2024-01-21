import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { MatCardLgImage } from '@angular/material/card';
import { TranslateService } from '@ngx-translate/core';
export interface PeriodicElement {
  title: string;
  user: string;
  deadLineDate: string;
  status: string;
}

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadline','status', 'actions'];
  dataSource:any[] = [];
  tasksFilter!:FormGroup;
  timeoutId:any;
  page:any=1;
  total:any;
  itemsPerPage=3;
  users:any = [
    {name:"Ahmed" , id:"659df957bf0f2f735c0261fe"},
    {name:"Mohamed" , id:"659df9edbf0f2f735c026209"},
    {name:"user2",id:"65a96591f8d5ba825caa024a"}
  ]
  filtration:any={};
  status:any = [
    {name:this.translate.instant("tasks.complete")},
    {name:"In-Progress"},
  ]
  constructor(
    private service:TasksService,
    public dialog: MatDialog,
    private toaster:ToastrService,
    private spinner:NgxSpinnerService,
    private translate:TranslateService
    ) { }

  ngOnInit(): void {
   this.getAllTasks();
  }


  getAllTasks() {
    return this.service.getAllTasks(this.filtration,this.page,this.itemsPerPage).subscribe({
      next:(res:any)=>{
        this.dataSource=this.formulateTasks(res.tasks);
        this.total=res.totalItems
        console.log(res);
        console.log(this.total);
      },
    })
  }
  AddTask(){
      const dialogRef = this.dialog.open(AddTaskComponent, {
        width:'750px',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.getAllTasks();         
        }
      });
  }

  formulateTasks(data:any[]){
    //this function must take an array of objects and return it after mapping
    data=data.map((task:any)=>{
      return {
        ...task,
        user:task.userId.username
      }
    })
    console.log(data);
    return data;
  }
  deleteTask(id:any){
    console.log(id);
    this.service.deleteTask(id).subscribe({
      next:(res)=>{
        this.toaster.success("Task deleted successfully");
        this.getAllTasks();
        },
      error:(err:any)=>{console.log(err.error.message);
      }
    })
  }
  updateTask(model:any){
    const dialogRef = this.dialog.open(AddTaskComponent, {
      width:'750px',
      data:model,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAllTasks();
      }
    });
  }

  search(event:any){
    this.filtration["keyword"]=event.target.value;
    clearTimeout(this.timeoutId);
    this.timeoutId=setTimeout(() => {
      this.getAllTasks();
    }, 2000);
  }

  changeUser(event:any){
    console.log(event);
    this.filtration["userId"]=event.value;
    this.getAllTasks();
  }

  changeStatus(event:any){
      console.log(event);
      this.filtration["status"]=event.value;
      this.getAllTasks();
  }

  changeDate(event:any,type:any){
    console.log(event.value);
    this.filtration[type]=moment(event.value).format("MM/DD/YYYY");
    if( type === "toDate" && this.filtration[type] !== "Invalid date"){
      this.getAllTasks();
    }
    console.log(this.filtration);
  }
  gty(event:any){
    console.log(event);
    this.page=event;
    this.getAllTasks();
  }
}
