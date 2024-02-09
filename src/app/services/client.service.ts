import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http:HttpClient) { }

  // database URL
  private URL:string = `http://localhost:3000/Client`;

  // Method to get all clients
  getAllClients():Observable<Client[]> {
    return this.http.get<Client[]>(`${this.URL}`);
  }

  // Method to get a single client using Id
  getOneClient(id:any):Observable<Client>{
    return this.http.get<Client>(`${this.URL}/${id}`);
  }

  // Method to add a client to the db
  addOneClient(clientData:Client):Observable<Object>{
    return this.http.post(`${this.URL}`, clientData);
  }

  // Method to update a client data
  updateOneClient(id:any, clientData:Client):Observable<Object>{
    return this.http.put(`${this.URL}/${id}`, clientData);
  }

  // Method to delete a client data
  deleteOneClient(id:any):Observable<Object>{
    return this.http.delete(`${this.URL}/${id}`);
  }

}
