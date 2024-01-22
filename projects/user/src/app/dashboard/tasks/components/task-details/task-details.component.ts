import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../../services/tasks.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit {
  taskId:any;
  taskDetails:any;
  constructor(private route:ActivatedRoute,private service:TasksService,private toaster:ToastrService,private router:Router) { 
    this.route.paramMap.subscribe({
      next:(res:any)=>{
        console.log(res);
        
        this.taskId = res.params['id']
      }
    })
  }
  ngOnInit(): void {
    this.getTaskDetails();
  }
  getTaskDetails(){
    this.service.taskDetails(this.taskId).subscribe({
      next:(res:any)=>{this.taskDetails=res.tasks}
    })
  }
  complete(){
    const model = {
      id:this.taskId
    }
    this.service.completeTask(model).subscribe({
      next:(res:any)=>{
        //toaster call all tasks again
        this.toaster.success("Task Completed Successfully","Success");
        this.router.navigate(["/tasks"])
      }
    })
  }
}
