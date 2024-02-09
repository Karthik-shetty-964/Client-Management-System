import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { }

  // database URL
  private URL:string = `http://localhost:3000/Project`;

  // Method to get all clients
  getAllProjects():Observable<Project[]> {
    return this.http.get<Project[]>(`${this.URL}`);
  }

  // Method to get a single client using Id
  getOneProject(id:any):Observable<Project>{
    return this.http.get<Project>(`${this.URL}/${id}`);
  }

  // Method to add a client to the db
  addOneProject(clientData:Project):Observable<Object>{
    return this.http.post(`${this.URL}`, clientData);
  }

  // Method to update a client data
  updateOneProject(id:any, clientData:Project):Observable<Object>{
    return this.http.put(`${this.URL}/${id}`, clientData);
  }

  // Method to delete a client data
  deleteOneProject(id:any):Observable<Object>{
    return this.http.delete(`${this.URL}/${id}`);
  }
}
