import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ClientMeetings } from 'src/app/models/client-meetings';
import { ClientMeetingsService } from 'src/app/services/client-meetings.service';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css']
})
export class MeetingsComponent implements OnInit {
  constructor(private router : Router, private meetingService : ClientMeetingsService, private clientService:ClientService) {}
  meetings: ClientMeetings[] = [];
  meeting: ClientMeetings = new ClientMeetings("", "", new Date(), "", "", "");
  modal: ClientMeetings = new ClientMeetings("", "", new Date(), "", "", "");
  clients:Client[] = [];
  message:string = "";

  ngOnInit() : void {
     // Method to execute the function to fetch all client data.
     this.clientService.getAllClients().subscribe((clientsData) => {
      this.clients = clientsData;
    })

    // Method to get all client meetings
    this.meetingService.getAllClientMeetings().subscribe((meetingsData) => {
      this.meetings = meetingsData;
    })
  }

  addMeeting(loginForm : any) {
    this.meeting = {...this.meeting, id : this.meeting.id.toString()};

    this.meetingService.addOneClientMeeting(this.meeting).subscribe((data) => {
      this.ngOnInit();
      this.message=`New meeting has been added`;
      loginForm.reset();
      this.meeting = new ClientMeetings("", "", new Date(), "", "", "");
      setTimeout(()=>{this.message=""}, 2000);
    })
  }

  // Method to fetch single task
  getOneMeeting(id:any) {
    id = id.toString();
    
    this.meetingService.getOneClientMeeting(id).subscribe((data) => {
      this.modal = data;
    })
  }

  editMeeting(id:any) {
    id = id.toString();
    
    this.meetingService.updateOneClientMeeting(id, this.modal).subscribe((data) => {
      this.ngOnInit();
      this.modal = new ClientMeetings("", "", new Date(), "", "", "");
      this.message="Meeting updated successfully"
      setTimeout(()=>{this.message=""}, 2000);
    })
  }

  deleteMeeting(id:any) {
    id = id.toString();
    
    let confirmation = confirm('Are you sure to delete this Meeting?');
    if(confirmation) {
      this.meetingService.deleteOneClientMeeting(id).subscribe((data) => {
        this.ngOnInit();
        this.message='Meeting deleted successfully';
      })
    } else {
      this.message='No Meeting is deleted';
    }
    setTimeout(()=>{this.message=""}, 2000);
  }
}
