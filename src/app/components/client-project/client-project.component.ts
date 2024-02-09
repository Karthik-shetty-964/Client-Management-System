import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import {Router, ActivatedRoute} from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { ClientMeetings } from 'src/app/models/client-meetings';
import { ClientMeetingsService } from 'src/app/services/client-meetings.service';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-project',
  templateUrl: './client-project.component.html',
  styleUrls: ['./client-project.component.css']
})
export class ClientProjectComponent implements OnInit {

  constructor(private router: Router, private clientService: ClientService, private activeRoute : ActivatedRoute, private meetingService:ClientMeetingsService, private projectService:ProjectService, private location:Location) { }

  id:any;
  message : string = "";
  client: Client = new Client("", "", "", "", "", "");
  meetings: ClientMeetings[] = [];
  projects: Project[] = [];
  meeting: ClientMeetings = new ClientMeetings("", "", new Date(), "", "", "");
  project: Project = new Project("","",new Date(),0,"");
  
  ngOnInit(): void {
    // Method to fetch single client  data
    this.id = this.activeRoute.snapshot.params['id'];
    this.clientService.getOneClient(this.id).subscribe((clientData) => {
      this.client = clientData;
    })

    // Method to get all meetings of the particular client
    this.meetingService.getAllClientMeetings().subscribe((meetingsData) => {
      for(let meeting of meetingsData) {
        if(meeting.clientId == this.client.id) {
          this.meetings.push(meeting);
        }
      }
    })

    // Method to get all projects of the  particular client
    this.projectService.getAllProjects().subscribe((projectsData) => {
      for(let project of projectsData) {
        if(project.clientId == this.client.id){
          this.projects.push(project);
        }
      }
    })
  }

  getClientProfile(id:any) {
    if(sessionStorage.getItem('clientId')) {
      this.router.navigate(['user', id]);
    } else {
      this.router.navigate(['client', id]);
    }
  }

  getOneProject(id:any) {    
      this.router.navigate(['project', id]);
  } 

  goBack() {
    this.location.back();
  }
}
