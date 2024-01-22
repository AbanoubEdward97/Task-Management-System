import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';

export interface PeriodicElement {
  title: string;
  description: string;
  deadLineDate: string;
  status: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {status:'Complete' , title: 'Hydrogen', description: "1.0079", deadLineDate:"10-11-2022" },
  {status:'In-Prossing' , title: 'Helium', description: "4.0026", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Lithium', description: "6.941", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Beryllium', description: "9.0122", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Boron', description: "10.811", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Carbon', description: "12.010", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Nitrogen', description: "14.006", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Oxygen', description: "15.999", deadLineDate:"10-11-2022" },
  {status:'Complete' , title: 'Fluorine', description: "18.998", deadLineDate:"10-11-2022" },
  { status:'Complete' , title: 'Neon', description: "20.179", deadLineDate:"10-11-2022" },
];
@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {
  displayedColumns: string[] = ['position', 'title', 'user' ,'deadLineDate','status', 'actions'];
  dataSource:any = [];
  tasksFilter!:FormGroup;
page:any=1;
total:any;
userData:any;
itemsPerPage=3;
totalItems:any=0;
selectedStatus:string="In-Progress";
  users:any = [
    {name:"Ahmed" , id:"659df957bf0f2f735c0261fe"},
    {name:"Mohamed" , id:"659df9edbf0f2f735c026209"},
  ]

  status:any = [
    {name:"Complete" , id:1},
    {name:"In-Progress" , id:2},
  ]
  constructor(public dialog: MatDialog ,private fb:FormBuilder,private service:TasksService,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.createform();
    this.getUserData();
    this.getAllTasks();
  }

  createform() {
    this.tasksFilter = this.fb.group({
      title:[''],
      userId:[''],
      fromDate:[''],
      toDate:['']
    })
  }

  getAllTasks() {
    let params ={
      page:this.page,
      limit:this.itemsPerPage,
      status:this.selectedStatus

    }
    console.log(this.userData);
    
   this.service.getUserTasks(this.userData.userId,params).subscribe({
    next:(res:any)=>{
      console.log(res);

      this.dataSource=res.tasks;
      this.totalItems=res.total
    },
    error:(err:any)=>{
      this.dataSource=[];
    }
   })
    
  }
  getUserData(){
    let token = JSON.stringify(localStorage.getItem("token"));
    this.userData=JSON.parse(window.atob(token.split(".")[1]));
    //console.log(this.userData);
  }
  gty(event:any){
    console.log(event);
    this.page=event;
    this.getAllTasks();
  }
  complete(el:any){
    const model = {
      id:el._id
    }
    this.service.completeTask(model).subscribe({
      next:(res:any)=>{
        //toaster call all tasks again
        this.getAllTasks();
        this.toaster.success("Task Completed Successfully","Success");
      }

    })
  }
}
