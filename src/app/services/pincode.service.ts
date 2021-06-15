import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Pincode} from './../models/pincode.model';

@Injectable({
  providedIn: 'root'
})
export class PincodeService {
	private BASE_URL = "http://localhost:8080/shop/pincode/";
  constructor(private httpClient:HttpClient) { }

  public getAll(page:number, size: number):Observable<any>
  {
    let url = `${this.BASE_URL}all?page=${page}&size=${size}`;
  	return this.httpClient.get(url).pipe(
  			retry(1), 
  			catchError(this.handleError)
  		);
  }
  public getByCode(code:string):Observable<Pincode>
  {
  	let url = this.BASE_URL + "code/" + code;
  	return this.httpClient.get<Pincode>(url).pipe(
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
   window.alert(errorMessage);
   return throwError(errorMessage);
  }
}
