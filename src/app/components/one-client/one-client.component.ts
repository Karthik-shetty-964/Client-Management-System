import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import {Router, ActivatedRoute} from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';
import { GuardService } from 'src/app/services/guard.service';

@Component({
  selector: 'app-one-client',
  templateUrl: './one-client.component.html',
  styleUrls: ['./one-client.component.css']
})
export class OneClientComponent implements OnInit {
  constructor(private router: Router, private guardService: GuardService, private clientService:ClientService, private activeRoute : ActivatedRoute, private location:Location) { }
  id:any;
  message : string = "";
  client: Client = new Client("", "", "", "", "", "");
  isClientLoggedIn:boolean = false;
  

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];
    this.clientService.getOneClient(this.id).subscribe((clientData) => {
      this.client = clientData;
    })

    if(this.guardService.isClientLoggedIn()) {
      this.isClientLoggedIn = true;
    }
  }

  editClientData() {
    this.clientService.updateOneClient(this.id, this.client).subscribe((clientData) => {
      this.message = 'Data updated successfully';
      setTimeout(() => {
        this.message = "";
      }, 2000);
    })
  }

  getClientProjects(id:any) {
    if(sessionStorage.getItem('clientId')) {
        this.router.navigate(['userProjects', id]);
      } else {       
        this.router.navigate(['clientProjects', id]);
    }
  }

  goBack() {
    this.location.back();
  }

  logout() {
    this.router.navigate(['login']);
  }
}
