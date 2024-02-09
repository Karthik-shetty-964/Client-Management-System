import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientMeetings } from '../models/client-meetings';

@Injectable({
  providedIn: 'root'
})

export class ClientMeetingsService {

  constructor(private http:HttpClient) { }

  // database URL
  private URL:string = `http://localhost:3000/Client_Meetings`;

  // Method to get all clients
  getAllClientMeetings():Observable<ClientMeetings[]> {
    return this.http.get<ClientMeetings[]>(`${this.URL}`);
  }

  // Method to get a single client using Id
  getOneClientMeeting(id:any):Observable<ClientMeetings>{
    return this.http.get<ClientMeetings>(`${this.URL}/${id}`);
  }

  // Method to add a client to the db
  addOneClientMeeting(clientMeetingData:ClientMeetings):Observable<Object>{
    return this.http.post(`${this.URL}`, clientMeetingData);
  }

  // Method to update a client data
  updateOneClientMeeting(id:any, clientMeetingData:ClientMeetings):Observable<Object>{
    return this.http.put(`${this.URL}/${id}`, clientMeetingData);
  }

  // Method to delete a client data
  deleteOneClientMeeting(id:any):Observable<Object>{
    return this.http.delete(`${this.URL}/${id}`);
  }
}
