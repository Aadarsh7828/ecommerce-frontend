import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Category} from './../models/category.model';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
	private BASE_URL = "http://localhost:8080/shop/category/";
  constructor(private httpClient:HttpClient) { }

  public getAll():Observable<Category[]>
  {
  	return this.httpClient.get<Category[]>(this.BASE_URL).pipe(
  			retry(1), 
  			catchError(this.handleError)
  		);
  }
  public getByName(name:string): Observable<Category>
  {
  	let url = this.BASE_URL + "name/" + name;
  	return this.httpClient.get<Category>(url).pipe(
  		retry(1), 
  		catchError(this.handleError)
  		);
  }
  public getById(id:number): Observable<Category>
  {
  	let url = this.BASE_URL + "id/" + id;
  	return this.httpClient.get<Category>(url).pipe(
  		retry(1), 
  		catchError(this.handleError)
  		);
  }
  public add(category: Category)
  {
  	let url = this.BASE_URL;
  	return this.httpClient.post<boolean>(url, category).pipe(
  		retry(1), 
  		catchError(this.handleError)
  		);
  }
  public update(category: Category, id:number)
  {
  	let url = this.BASE_URL + id;
    let cat = new Category();
    cat.name = category.name;
    cat.description = category.description;
  	return this.httpClient.put<boolean>(url, cat).pipe(
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
