import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItemService } from './cart-item.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  BASE_URL = "http://localhost:8080/shop/buy-order/pay"
  constructor(private httpClient: HttpClient,
              private loginService: LoginService, 
              private carItemService: CartItemService) { }

  createOrder(amount: number, propertyMap: any): any
  {
    console.log("order sent to server");
    let token = this.loginService.getToken();
      console.log("checkout service");
      let body = {'amount': amount, 'info': 'order_request',
               'attributes' : propertyMap};
      return this.httpClient.post(this.BASE_URL, body);
  }
}
