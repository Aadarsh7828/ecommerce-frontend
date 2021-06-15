import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ReviewSummaryService {

  private BASE_URL = "http://localhost:8080/shop/review/summary/product/";
  constructor(private httpClient:HttpClient) { }

  public getSummary(productId):Observable<any>
  {
    let url = `${this.BASE_URL}${productId}`;
  	return this.httpClient.get(url).pipe(
  			retry(1), 
  			catchError(this.handleError)
  		);
  }

  getMockDate()
  {
    let data= {
        "1" : 33, 
        "2" : 29,
        "3" : 40,
        "4" : 124,
        "5" : 252
    }
    return data;
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
