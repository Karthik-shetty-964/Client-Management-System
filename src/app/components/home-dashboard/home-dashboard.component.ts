import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project';
import { Client } from 'src/app/models/client';
import { ClientMeetings } from 'src/app/models/client-meetings';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { ProjectService } from 'src/app/services/project.service';
import { ClientMeetingsService } from 'src/app/services/client-meetings.service';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {

  constructor(private router:Router, private clientService:ClientService, private projectService:ProjectService, private meetingService:ClientMeetingsService) {}

  allProjects:Project[] = [];
  allClients:Client[] = [];
  allMeetings:ClientMeetings[] = [];
  project:Project = new Project("", "", new Date(), 0, "");
  client:Client = new Client("", "", "", "", "", "");
  clientMeeting:ClientMeetings = new ClientMeetings("", "", new Date(), "", "", "");

  ngOnInit(): void {     
    // Method to execute the function to fetch all client data.
    this.clientService.getAllClients().subscribe((clientData) => {
      this.allClients = clientData;
    })

    // Method to execute the function to fetch all the project data
    this.projectService.getAllProjects().subscribe((projectData) => {
      this.allProjects = projectData;
    })

    // Method to execute the function to fetch all the meetings data
    this.meetingService.getAllClientMeetings().subscribe((meetingData) => {
      this.allMeetings = meetingData;
      console.log(this.allMeetings);
    })
  }

  // Route to clients page
  getClientsPage() {
    this.router.navigate(['clients']);
  }
  // Route to projects page
  getProjectsPage() {
    this.router.navigate(['projects']);
  }
  // Route to meetings page
  getMeetingsPage() {
    this.router.navigate(['meetings']);
  }
}
