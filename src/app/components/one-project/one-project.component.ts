import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { ProjectService } from './../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';
import { ProjectTasks } from 'src/app/models/project-tasks';
import { ProjectTasksService } from 'src/app/services/project-tasks.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-one-project',
  templateUrl: './one-project.component.html',
  styleUrls: ['./one-project.component.css']
})
export class OneProjectComponent implements OnInit {
  constructor(private router: Router, private projectService: ProjectService, private clientService: ClientService, private taskService: ProjectTasksService, private activeRoute: ActivatedRoute, private location:Location) { }
  project: Project = new Project("", "", new Date(), 0, "");
  client: Client = new Client("", "", "", "", "", "");
  task: ProjectTasks = new ProjectTasks("", "", "", "", "");
  projectTasks: ProjectTasks[] = [];
  message: string = "";
  isEdit:boolean = false;

  ngOnInit(): void {
    let id = this.activeRoute.snapshot.params['id'];

    // Method to execute the function to fetch all projects data.
    this.projectService.getOneProject(id).subscribe((projectData) => {
      this.project = projectData;


      // Method to execute the function to fetch all the project tasks
      this.taskService.getAllProjectTasks().subscribe((projectTasks) => {
        // fetch only those projecttasks related to required project
        this.projectTasks = [];
        for (let projectTask of projectTasks) {
          if (projectTask.projectId == this.project.id) {
            this.projectTasks.push(projectTask);
          }
        }
      })

      // Method to execute the function to fetch one client.
      this.clientService.getOneClient(this.project.clientId).subscribe((clientData) => {
        console.log(clientData);
        this.client = clientData;
      })
    })

  }

  // Method to add project task
  addProjectTask(form:any) {
    this.task = {...this.task, id : this.task.id.toString(), projectId: this.project.id};

    this.taskService.addOneProjectTask(this.task).subscribe((taskData)=>{
      this.task = new ProjectTasks("", "", "", "", "");
      this.ngOnInit();
      this.message=`New task has been added`;
      form.reset();
      setTimeout(()=>{this.message=""}, 2000);
    })
  }
  
  // Method to fetch single task
  getOneTask(tId:any, pId:any) {
    tId = tId.toString();
    pId = pId.toString();
    this.isEdit = true;
    this.taskService.getAllProjectTasks().subscribe((tasksData) => {
      for(let task of tasksData) {
        if(task.id == tId && task.projectId == pId) {
          this.task = task;
        }
      }
    })
  }
  
  // Method to delete a task
  deleteTask(id:any) {
    id = id.toString();
    
    let confirmation = confirm('Are you sure to delete the task?');
    if(confirmation) {
      this.taskService.deleteOneTaskData(id).subscribe((data) => {
        this.ngOnInit();
        this.message='Task deleted successfully';
      })
    } else {
      this.message='No task is deleted';
    }
    setTimeout(()=>{this.message=""}, 2000);
  }
  
  // Method to edit a task
  editTask(id:any) {
    id = id.toString();
    
    this.taskService.updateOneProjectTask(id, this.task).subscribe((data) => {
      this.ngOnInit();
      this.task = new ProjectTasks("", "", "", "", "");
      this.message="Task updated successfully"
      setTimeout(()=>{this.message=""}, 2000);
    })
  }
  
  // Method to go to projects page
  goToProjects() {
    this.router.navigate(['projects']);
  }

  goBack() {
    this.location.back();
  }

  changeIsEdit(form:any) {
    form.reset(); 
    this.isEdit = false;
  }

  showClient(id:any) {
    if(sessionStorage.getItem('clientId')) {
      this.router.navigate(['user', id]);
    } else {      
      this.router.navigate(['client', id]);
    }
  }
}
