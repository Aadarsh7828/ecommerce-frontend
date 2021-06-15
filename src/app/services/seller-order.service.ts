import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerOrderService {
  

  private BASE_URL = "http://localhost:8080/shop/buy-order/";
  constructor(private httpClient:HttpClient) { }

  public getAll(sellerId:number, page:number, size: number, sortOrder:string):Observable<any>
  {
    let url = `${this.BASE_URL}seller-order/${sellerId}?page=${page}&size=${size}`;
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
  public getMonthlyRevenue(sellerId:number, year:number, startMonth:string, endMonth:string):Observable<any>
  {
    let url = `${this.BASE_URL}revenue-monthly/${sellerId}?year=${year}&startMonth=${startMonth}&endMonth=${endMonth}`;
    return this.httpClient.get(url).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }
  public getYearlyRevenue(sellerId:number, startYear:number,endYear:number):Observable<any>
  {
    let url = `${this.BASE_URL}revenue-yearly/${sellerId}?startYear=${startYear}&endYear=${endYear}`;
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


  getMockData()
  {
    let data = 
    [
    {
    "id":10001,
    "order_date":"2010-04-22",
    "order_ship_date":"2010-04-27 21:21:02 UTC",
    "address":"1 Del Mar Plaza",
    "order_status":"REACHED_DESTINATION",
    "payment_type":"COD"
    },
    {
      "id":10001,
      "order_date":"2010-04-22",
      "order_ship_date":"2010-04-27 21:21:02 UTC",
      "address":"1 Del Mar Plaza",
      "order_status":"REACHED_DESTINATION",
      "payment_type":"COD"
    },
    {
        "id":10001,
        "order_date":"2010-04-22",
        "order_ship_date":"2010-04-27 21:21:02 UTC",
        "address":"1 Del Mar Plaza",
        "order_status":"REACHED_DESTINATION",
        "payment_type":"COD"
      },
      {
        "id":10001,
        "order_date":"2010-04-22",
        "order_ship_date":"2010-04-27 21:21:02 UTC",
        "address":"1 Del Mar Plaza",
        "order_status":"REACHED_DESTINATION",
        "payment_type":"COD"
        },
        {
          "id":10001,
          "order_date":"2010-04-22",
          "order_ship_date":"2010-04-27 21:21:02 UTC",
          "address":"1 Del Mar Plaza",
          "order_status":"REACHED_DESTINATION",
          "payment_type":"COD"
          },
          {
            "id":10001,
            "order_date":"2010-04-22",
            "order_ship_date":"2010-04-27 21:21:02 UTC",
            "address":"1 Del Mar Plaza",
            "order_status":"REACHED_DESTINATION",
            "payment_type":"COD"
            },
            {
              "id":10001,
              "order_date":"2010-04-22",
              "order_ship_date":"2010-04-27 21:21:02 UTC",
              "address":"1 Del Mar Plaza",
              "order_status":"REACHED_DESTINATION",
              "payment_type":"COD"
              },
              {
                "id":10001,
                "order_date":"2010-04-22",
                "order_ship_date":"2010-04-27 21:21:02 UTC",
                "address":"1 Del Mar Plaza",
                "order_status":"REACHED_DESTINATION",
                "payment_type":"COD"
                },
                {
                  "id":10001,
                  "order_date":"2010-04-22",
                  "order_ship_date":"2010-04-27 21:21:02 UTC",
                  "address":"1 Del Mar Plaza",
                  "order_status":"REACHED_DESTINATION",
                  "payment_type":"COD"
                  },
    ];
    return data;
  }
  changeStatus(status: string) {
    let url = `${this.BASE_URL}`
    //return this.httpClient.put()
  }
}
