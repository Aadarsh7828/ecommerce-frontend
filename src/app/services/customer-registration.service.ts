import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomerRegistrationService {
  BASE_URL = "http://localhost:8080/shop/register/customer";
  constructor(private httpClent: HttpClient) { }

  public registerUser(username:string, password: string)
  {
    let body = {"username": username, "password": password};
    console.log("register request");
    console.log(body);
    return this.httpClent.post(this.BASE_URL, body, {responseType:'text'}).pipe(
      retry(1), 
      catchError(this.handleError)
    );
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
  // window.alert(errorMessage);
   return throwError(errorMessage);
  }
}
