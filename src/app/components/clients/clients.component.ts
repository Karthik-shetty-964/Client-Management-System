import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  constructor(private router: Router, private clientService: ClientService) { }
  client: Client = new Client("", "", "", "", "", "");
  allClients: Client[] = [];
  message : string = "";

  ngOnInit(): void {
    // Method to execute the function to fetch all client data.
    this.clientService.getAllClients().subscribe((clientsData) => {
      this.allClients = clientsData;
    })
  }

  addClient(loginForm:any) {
    this.client = {...this.client, id : this.client.id.toString()};
    
    // Method to execute the function to add a client to db
    this.clientService.addOneClient(this.client).subscribe((clientData) => {
      // this.client = new Client("", "", "", "", "", "");
      this.ngOnInit();
      loginForm.reset();
      this.message = "New Client has been added"
      setTimeout(()=>{this.message=""},2000);
    })
  }

  // Method to delete a student record
  deleteClient(id:any) {
    let confirmation = confirm('Are you sure to delete the record?');
    if(confirmation) {
      this.clientService.deleteOneClient(id).subscribe((data) => {
        this.ngOnInit();
      })
      setTimeout(()=>{
        alert('Record deleted successfully');
      }, 500);   
    } else {
      alert('No record is deleted');
    }
  }

  getOneClient(id:any) {
    this.router.navigate(['client', id]);
  }
}
