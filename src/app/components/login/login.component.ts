import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userEmail: string = "";
  password: string = "";
  message: string = "";
  allClients: Client[] = [];

  constructor(private router:Router, private clientService:ClientService){
    sessionStorage.clear();
  }

  // Method to authenticate user
  authenticateUser(loginForm: any) {
    if (loginForm.valid) {
      // Check if the logging in user is an admin 
      if (this.userEmail === "admin@gmail.com") {
        if(this.password === "@admin123"){
          sessionStorage.setItem("adminEmail", this.userEmail);
          this.router.navigate(['homeDashboard']);
        } else {
          this.message = "Password Incorrect";
        }
      }
      // Checks for the validation of normal user
      else {
        this.clientService.getAllClients().subscribe((clientsData) => {
          for(let client of clientsData) {
            if(client.email === this.userEmail){
              if(client.password === this.password) {
                // If control comes here, then the user is valid and authenticated
                sessionStorage.setItem('clientEmail', client.email);
                sessionStorage.setItem('clientId', client.id.toString());
                this.router.navigate(['user', client.id]);  
              } else {
                this.message = "Password is incorrect";
                setTimeout(()=>{this.message=""}, 2000);
                return;
              }
            }
          }
          this.message = "Not a valid client"
          setTimeout(()=>{this.message=""}, 2000);
          return;
        })           
      }
    }
  }
}
