import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { HttpClientModule } from '@angular/common/http';
import { OneClientComponent } from './components/one-client/one-client.component';
import { OneProjectComponent } from './components/one-project/one-project.component';
import { ClientProjectComponent } from './components/client-project/client-project.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HomeDashboardComponent,
    MeetingsComponent,
    ClientsComponent,
    ProjectsComponent,
    OneClientComponent,
    OneProjectComponent,
    ClientProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
