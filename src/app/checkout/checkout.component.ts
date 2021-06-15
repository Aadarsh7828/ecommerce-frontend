import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItemService } from '../services/cart-item.service';
import { CheckoutService } from '../services/checkout.service';
import { LoginService } from '../services/login.service';
import { WindowRef } from './../models/window.ref';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  products = [];
  token = "";
  constructor(private cartItemService: CartItemService,
              private checkoutService: CheckoutService,
              private loginService: LoginService,
              private router: Router) { }

  ngOnInit(): void {
    this.cartItemService.getAll().subscribe(response=>{
      if(response == null)
      {
        alert("failed to fetch response");
        return;
      }
      console.log(response);
      this.products = response;
    });
  }

  getTotal()
  {
    let total = 0;
    for(let idx = 0;idx < this.products.length;++idx)
    {
      total += this.products[idx].attributes.price;
    }
    return total;
  }

  placeOrder()
  {
    console.log("palce order");
    if(!this.loginService.isLoggedIn())
    {
      this.router.navigate(['/login']);
    }
    let amount = this.getTotal();
    if(amount == undefined || amount == null || amount == 0 || amount == Number.NaN)
    {
      alert("shopping cart is empty");
      return;
      
    }
    console.log("paymenet started");
    console.log(this.getTotal());
    let token = this.loginService.getToken();
    let propertyMap = {"token": token, "city": "test_city", 
                      "state": "test_state", "shipping_address": "test_address",
                      "payment_type": "COD"}
    this.checkoutService.createOrder(amount,propertyMap).subscribe(response=>{
      console.log(response);
      //let order = response.order;
      let order = response;
      if(order.status == 'created')
      {
        console.log("status created");
        let options = {
          "key": "rzp_test_NUfcQVU44SeBMy",
          "amount": order.amount, 
          "currency": "INR",
          "name": "Ecommerce shop",
          "description": "Test Transaction",
          "image": "assets/images/logo/payment-modal.png",
          "order_id": order.id,
          "token": this.loginService.getToken(),
          "products": this.products,
          "handler": function (order){
          console.log(order.razorpay_payment_id);
          console.log(order.razorpay_order_id);
          console.log(order.razorpay_signature)
          this.updatePaymentStatus();
          alert("payement success");
          
          },
          "prefill": {
          "name": "",
          "email": "",
          "contact": ""
          },
          "notes": {
          "address": "Razorpay Corporate Office"
        },
        "theme": {
        "color": "#3399cc"
        }
        };
        let windowRef = WindowRef.nativeWindow();
        var rzp1 = new windowRef.Razorpay(options);

        rzp1.on('payment.failed', function (order){
        console.log(order.error.code);
        console.log(order.error.description);
        console.log(order.error.source);
        console.log(order.error.step);
        console.log(order.error.reason);
        console.log(order.error.metadata.order_id);
        alert(order.error.metadata.payment_id);
        alert("payment failed");
        });
        rzp1.open();
      }
    },
    error=>{
      alert(error);  
    });

  }
  updatePaymentStatus()
  {
    console.log("update payement status");
  }
}
