import { Component, OnInit } from '@angular/core';
import { MyOrderService } from '../services/my-order.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders = [];
  product;
  constructor(private myOrderService: MyOrderService,
              private shopService : ShopService) { }

  ngOnInit(): void {
    this.myOrderService.getAll().subscribe(response=>{
      this.orders = response.content;
      for(let i = 0;i< this.orders.length;++i)
      {
      this.shopService.getByProductId(this.orders[i].productId).subscribe(
        product=>{
          //console.log(product);
          this.orders[i].productTitle = product.title;
        }
      );
      }
      //console.log(this.orders);
    }
      
    );
  }
  getUrl(id){
    return "/order-details/" + id;
}
}
