import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SellerLoginService {
  BASE_URL = "http://localhost:8080/shop/login/seller";
  loggedIn = new Subject<boolean>();
  constructor(private httpClient:HttpClient, private router: Router) { 
    
  }
  private username: string;
  generateToken(username, password) 
  {
    let credentials = {"username" : username, "password": password};
    this.username = username;
    console.log(credentials);
    return this.httpClient.post(this.BASE_URL, credentials,{observe: 'response'});
  }
  getUsername()
  {
    return this.username;
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
