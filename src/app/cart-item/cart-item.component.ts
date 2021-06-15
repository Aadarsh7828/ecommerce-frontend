import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { CartItemService } from '../services/cart-item.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  products :any= [];
  constructor(private cartItemService: CartItemService, private loginService: LoginService) { }

  ngOnInit(): void {
    if(this.loginService.isLoggedIn())
    {
  	this.cartItemService.getAll().subscribe(data=>{
      if(data.content == false)
      { 
        alert("error in fethcing data from server");
        return;
      }
      console.log(data);
      this.products = [];
      this.products = data;
    });
    }
    else
      {
        this.products = [];
      }
  	
  }
  getDiscount(product)
  {
   let mrp = product.mrp;
   let price = product.attributes.price;
   let discount = Math.ceil(((mrp - price)/mrp)*100);
   return discount;
  }
  getDisplayImage(product)
  {
    let imageUrl = product.attributes.image_url.split("\|")[0].trim();
    console.log(imageUrl);
    return imageUrl;
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
}
