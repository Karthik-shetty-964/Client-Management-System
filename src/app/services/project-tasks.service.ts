import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectTasks } from '../models/project-tasks';

@Injectable({
  providedIn: 'root'
})
export class ProjectTasksService {

  constructor(private http:HttpClient) { }

  // database URL
  private URL:string = `http://localhost:3000/ProjectTasks`;

  // Method to get all clients
  getAllProjectTasks():Observable<ProjectTasks[]> {
    return this.http.get<ProjectTasks[]>(`${this.URL}`);
  }

  // Method to get a single client using Id
  getOneProjectTask(id:any):Observable<ProjectTasks>{
    return this.http.get<ProjectTasks>(`${this.URL}/${id}`);
  }

  // Method to add a client to the db
  addOneProjectTask(taskData:ProjectTasks):Observable<Object>{
    return this.http.post(`${this.URL}`, taskData);
  }

  // Method to update a client data
  updateOneProjectTask(id:any, taskData:ProjectTasks):Observable<Object>{
    return this.http.put(`${this.URL}/${id}`, taskData);
  }

  // Method to delete a client data
  deleteOneTaskData(id:any):Observable<Object>{
    return this.http.delete(`${this.URL}/${id}`);
  }

}
