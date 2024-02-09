import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import  { ProjectService } from './../../services/project.service';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit{
  constructor(private router:Router, private  projectService :ProjectService, private clientService:ClientService) {}
  projects:Project[] = [];
  clients:Client[] = [];
  project:Project = new Project("", "", new Date(), 0, "");
  message:string = "";

  ngOnInit(): void {
      // Method to execute the function to fetch all clients data.
    this.clientService.getAllClients().subscribe((clientsData) => {
      this.clients = clientsData;
    })
      // Method to execute the function to fetch all projects data.
    this.projectService.getAllProjects().subscribe((projectsData) => {
      this.projects = projectsData;
    })
  }

  addProjectData() {
    this.project = {...this.project, id : this.project.id.toString()};
    
    this.projectService.addOneProject(this.project).subscribe((data) => {
      this.project = new Project("", "", new Date(), 0, "");
      this.ngOnInit();
      this.message=`New record has been added`;
      setTimeout(()=>{this.message=""}, 2000);
    })
  }

  getOneProject(pId : any){
      this.router.navigate(['project', pId]);
  }

  deleteOneProject(pId:any) {
    let confirmation = confirm('Are you sure to delete the project?');
    if(confirmation) {
      this.projectService.deleteOneProject(pId).subscribe((data) => {
        this.ngOnInit();
        this.message='Record deleted successfully';
      })
    } else {
      this.message='No record is deleted';
    }
    setTimeout(()=>{this.message=""}, 2000);
  }
}
