import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Seller} from './../models/seller.model';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SellerService  {
  constructor(private httpClient: HttpClient) { }
  BASE_URL = "http://localhost:8080/shop/seller/";
  public getAll():Observable<Seller[]>
  {
  	return this.httpClient.get<Seller[]>(this.BASE_URL).pipe(
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
