import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  selectedProduct = null;
  products = [];
  numberOfElements:number;
  totalElements: number;
  totalPages:number
  pageNumber:number;
  offset:number;
  entryPerPage = 12;
  sortOrder = "NONE";
  private BASE_URL = "http://localhost:8080/shop/review/";
  constructor(private httpClient:HttpClient) { }

  public getAll(productId: number,page:number, size: number, sortOrder:string):Observable<any>
  {
    let url = `${this.BASE_URL}product/${productId}?page=${page}&size=${size}&sortOrder=${sortOrder}`;
  	return this.httpClient.get(url).pipe(
  			retry(1), 
  			catchError(this.handleError)
  		);
  }
  public submitReview(review)
  {
    let url = `${this.BASE_URL}submit`;
    console.log(review);
    return this.httpClient.post(url, review);
  }
  getMockDate()
  {
    let data:any = [
      {
        "id" : "60ad46e390e11802cc4ad7b347",
        "rating": 3,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "perfect replacements!!",
        "customer_id": 189028,
        "first_name": "Ressie",
        "last_name": "Goodwyn",
         "date": "2017-09-03T00:00:00Z"
      },
      {"id" : "60ad46e390e11802cc4ad347b7",
        "rating": 4,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "I agree with the other review, the opening is ...",
        "customer_id": 677207,
  "first_name": "Bula",
  "last_name": "Reich",
         "date": "2017-09-03T00:00:00Z"},
         {"id" : "60ad46e390e11802c75c4ad347b7",
        "rating": 2,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "My New 'Friends' !!",
        "customer_id": 954117,
  "first_name": "Larisa",
  "last_name": "Still",
         "date": "2017-09-03T00:00:00Z"},
         {
         "id" : "60ad46e390e11802cc754a34d7b7",
        "rating": 2,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "Two Stars",
        "customer_id": 115794,
  "first_name": "Kermit",
  "last_name": "Mcphail",
         "date": "2017-09-03T00:00:00Z"
         },
         {"id" : "60ad46e390e11802cc446ad7b7",
        "rating": 3,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "Three Stars",
        "customer_id": 379487,
        "first_name": "Kaye",
        "last_name": "Tubbs",
         "date": "2017-09-03T00:00:00Z"},
         {"id" : "60ad46e390e11802cc574ad7b7",
        "rating": 1,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "perfect replacements!!",
        "customer_id": 204354,
  "first_name": "Efrain",
  "last_name": "Moats",
         "date": "2017-09-03T00:00:00Z"},
         {"id" : "60ad46e390e1180257cc4ad7b7",
        "rating": 5,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "Five Stars",
        "customer_id": 997526,
        "first_name": "Cecil",
        "last_name": "Teixeira",
         "date": "2017-09-03T00:00:00Z"},
         {"id" : "60ad46e390e11802c86c4ad7b7",
        "rating": 4,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "perfect replacements!!",
        "customer_id": 438826,
        "first_name": "Alysia",
        "last_name": "Basil",
         "date": "2017-09-03T00:00:00Z"},
         {"id" : "60ad46e390e11802696cc4ad7b7",
        "rating": 5,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "Top Clasp Broke Within 3 days!",
        "customer_id": 572732,
        "first_name": "Alise",
        "last_name": "Baltzell",
         "date": "2017-09-03T00:00:00Z"},
         {"id" : "60ad46e390e11802cc4689ad7b7",
        "rating": 2,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "perfect replacements!!",
        "customer_id": 899561,
        "first_name": "Terrell",
        "last_name": "Leader",
         "date": "2017-09-03T00:00:00Z"},
         {"id" : "60ad46e390e11802cc469ad7b7",
        "rating": 5,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "perfect replacements!!",
        "customer_id": 643205,
        "first_name": "Cameron",
        "last_name": "Chamberland",
         "date": "2017-09-03T00:00:00Z"},
         {"id" : "60ad46e390e11802cc5794ad7b7",
        "rating": 4,
        "text": "I thought it would be as big as small paper but turn out to be just like my palm. I think it is too small to read on it... not very comfortable as regular Kindle. Would definitely recommend a paperwhite instead.",
        "summary" : "perfect replacements!!",
        "customer_id": 443695,
        "first_name": "Leonore",
        "last_name": "Reason",
         "date": "2017-09-03T00:00:00Z"}
      ];
      return data;
  }

  public getByProductId( id:number): Observable<any>
  {
    let url = `${this.BASE_URL}product-id/${id}`;
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
