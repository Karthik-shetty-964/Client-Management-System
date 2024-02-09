import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { GuardService } from './services/guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'client-management-system';
  navbar:boolean = true;
  active:boolean = false;

  constructor(private router:Router, private guardService:GuardService) {}

  ngDoCheck(): void {
      let url = this.router.url;

      if(url === "/login" || url === "/" || this.guardService.isClientLoggedIn()) {
        this.navbar = false;
      } else {
        this.navbar = true;
      }
  }
}
