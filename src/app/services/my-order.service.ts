import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
export class MyOrderService {

  private BASE_URL = "http://localhost:8080/shop/buy-order/";
  constructor(private httpClient:HttpClient,
              private loginService: LoginService) { }

  public getAll():Observable<any>
  {
    let url = `${this.BASE_URL}history`;
    let body = {"token": this.loginService.getToken()};
  	return this.httpClient.post(url, body).pipe(
  			retry(1), 
  			catchError(this.handleError)
  		);
  }
  public getByOrderId(id): Observable<any>
  { 
    let url = `${this.BASE_URL}history/${id}`;
    return this.httpClient.get(url).pipe(
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
