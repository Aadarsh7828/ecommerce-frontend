import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { getLocaleMonthNames } from '@angular/common';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  BASE_URL = "http://localhost:8080/shop/login/customer";
  loggedIn = new Subject<boolean>();
  constructor(private httpClient:HttpClient, private router: Router) { 
    console.log("login service contructor called");
  }
  private username: string;
  generateToken(username, password) 
  {
    let credentials = {"username" : username, "password": password};
    localStorage.setItem("username", username);
    console.log(credentials);
    return this.httpClient.post(this.BASE_URL, credentials,{observe: 'response'});
  }
  getUsername()
  {
    return localStorage.getItem("username");
  }
  getToken()
  {
    return localStorage.getItem("token");
  }
  loginUser(token)
  {
    localStorage.setItem("token", token);
    this.loggedIn.next(true);
  }
  isLoggedIn()
  {
    let token = localStorage.getItem("token");
    if(token == undefined || token == null || token === "")
    {
      return false;
    }
    return true; 
  }

  logout()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    this.username = null;
    this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
  public handleError(error)
  {
  	  let errorMessage = '';
   if (error.error instanceof ErrorEvent) {
     // client-side error
     errorMessage = `Error: ${error.error.message}`;
   } else {
     // server-side error
     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   }
   window.alert(errorMessage);
   return throwError(errorMessage);
  }
}
