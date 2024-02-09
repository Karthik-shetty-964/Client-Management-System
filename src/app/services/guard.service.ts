import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardService {

  constructor() { }

  isClientLoggedIn():boolean{
    return sessionStorage.getItem('clientEmail') !== null;
  }

  isAdminLoggedIn():boolean{
    return sessionStorage.getItem('adminEmail') !== null;
  }
}
