import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HomeDashboardComponent } from './components/home-dashboard/home-dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ClientsComponent } from './components/clients/clients.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { OneClientComponent } from './components/one-client/one-client.component';
import { OneProjectComponent } from './components/one-project/one-project.component';
import { ClientProjectComponent } from './components/client-project/client-project.component';
import { adminGuard } from './guards/admin.guard';
import { userGuard } from './guards/user.guard';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login", component:LoginComponent},
  {path:"homeDashboard", component:HomeDashboardComponent, canActivate:[adminGuard]},
  {path:"clients", component:ClientsComponent, canActivate:[adminGuard]},
  {path:"projects", component:ProjectsComponent, canActivate:[adminGuard]},
  {path:"meetings", component:MeetingsComponent, canActivate:[adminGuard]},
  {path:"client/:id", component:OneClientComponent, canActivate:[adminGuard]},
  {path:"user/:id", component:OneClientComponent, canActivate:[userGuard]},
  {path:"project/:id", component:OneProjectComponent},
  {path:"clientProjects/:id", component:ClientProjectComponent, canActivate:[adminGuard]},
  {path:"userProjects/:id", component:ClientProjectComponent, canActivate:[userGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
