import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Subcategory} from './../models/subcategory.model';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  	private BASE_URL = "http://localhost:8080/shop/subcategory/";
  constructor(private httpClient:HttpClient) { }

  public getAll():Observable<Subcategory[]>
  {
  	return this.httpClient.get<Subcategory[]>(this.BASE_URL).pipe(
  			retry(1), 
  			catchError(this.handleError)
  		);
  }
  public getByName(name:string): Observable<Subcategory>
  {
  	let url = this.BASE_URL + "name/" + name;
  	return this.httpClient.get<Subcategory>(url).pipe(
  		retry(1), 
  		catchError(this.handleError)
  		);
  }
  public getById(id:number): Observable<Subcategory>
  {
  	let url = this.BASE_URL + "id/" + id;
  	return this.httpClient.get<Subcategory>(url).pipe(
  		retry(1), 
  		catchError(this.handleError)
  		);
  }
  public getByCategoryId(categoryId:number): Observable<Subcategory[]>
  {
  	let url = this.BASE_URL + "category" + "/" + categoryId;
  	return this.httpClient.get<Subcategory[]>(url).pipe(
  		retry(1), 
  		catchError(this.handleError)
  		);
  }
  public add(subcategory: Subcategory)
  {
  	let url = this.BASE_URL;
  	return this.httpClient.post<boolean>(url, subcategory).pipe(
  		retry(1), 
  		catchError(this.handleError)
  		);
  }
  public update(subcategory: Subcategory, id:number)
  {
  	let url = this.BASE_URL + id;
  	return this.httpClient.put<boolean>(url, subcategory).pipe(
  		retry(1), 
  		catchError(this.handleError)
  		);
  }
  public delete(id:number)
  {
  	let url = this.BASE_URL + id;
  	return this.httpClient.delete<boolean>(url).pipe(
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
