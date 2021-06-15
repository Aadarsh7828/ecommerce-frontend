import { Injectable } from '@angular/core';
import {City} from './../models/city.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import { LoginService } from './login.service';
@Injectable({
  providedIn: 'root'
})
// later for error handling HttpInterceptor will be used
export class CityService {
  private BASE_URL = 'http://localhost:8080/shop/city/';
  constructor(private httpClient: HttpClient, private loginService:LoginService) { 
  }
  public getAll(page:number, size:number):Observable<any>
  {
	return this.httpClient.get(`${this.BASE_URL}all?page=${page}&size=${size}`).pipe(
			retry(1), 
			catchError(this.handleError)
		);
  }
  
 handleError(error) {
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
