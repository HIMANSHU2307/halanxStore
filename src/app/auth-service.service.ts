import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDetail } from './AuthModal';
import { delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }


// login request
  AuthanticationLogin(userDetails: UserDetail) {
    debugger;
    return this.http.post('http://testapi.halanx.com/rest-auth/login/', userDetails);
  }

// logout request
  AuthanticationLogout(key) {
    // debugger;
    return this.http.post('http://testapi.halanx.com/rest-auth/logout/', key);
  }
}
