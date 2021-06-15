import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {
  BASE_URL = "http://localhost:8080/shop/cart-item/";
  constructor(private httpClient: HttpClient,private loginService:LoginService) { }
  getAll():Observable<any>
  {
    let username = this.loginService.getUsername();
    let url = `${this.BASE_URL}customer/${username}` ;
    return this.httpClient.get(url).pipe(
			retry(1), 
			catchError(this.handleError)
		);
  }
  add(productId)
  {
    if(this.loginService.isLoggedIn() === false)
    {
      alert("login to add in cart");
      return;
    }
    let token = this.loginService.getToken();
    let body = {"token" : token};
    let url = `${this.BASE_URL}add/product/${productId}`
    return this.httpClient.post(url, body).pipe(
			retry(1), 
			catchError(this.handleError)
		);
  }
  getItemCount():Observable<any>
  {
    let token= this.loginService.getToken();
    let body = {"token" : token};
    let url = `${this.BASE_URL}count`;
    return this.httpClient.post(url, body).pipe(
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
