import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class ShopService {
  
	private BASE_URL = "http://localhost:8080/shop/product/";
  constructor(private httpClient:HttpClient) { }

  public getAll(page:number, size: number, sortOrder:string):Observable<any>
  {
    let url = `${this.BASE_URL}all?page=${page}&size=${size}&sortOrder=${sortOrder}`;
  	return this.httpClient.get(url).pipe(
  			retry(1), 
  			catchError(this.handleError)
  		);
  }
  public getByProductId( id:number): Observable<any>
  {
    let url = `${this.BASE_URL}product-id/${id}`;
    return this.httpClient.get(url).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  public getBySellerId(sellerId:number,page:number,size:number, sortOrder:string):Observable<any>
  {
    let url = `${this.BASE_URL}seller/${sellerId}?page=${page}&size=${size}&sortOrder=${sortOrder}`;
    return this.httpClient.get(url).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  public uploadProductList(sellerId:number, file:File)
  {
    let url = `${this.BASE_URL}product-list/${sellerId}`;
    let formData = new FormData();
    console.log(file);
    formData.append('file', file,file.name);
    return this.httpClient.post(url,formData ).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  public searchProduct(query:string,page:number, size: number, sortOrder:string):Observable<any>
  {
    let url = `${this.BASE_URL}search?query=${query}&page=${page}&size=${size}`;
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
