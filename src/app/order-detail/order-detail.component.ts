import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyOrderService } from '../services/my-order.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  orderId = "";
  order = null;
  product = null;
  constructor(private route: ActivatedRoute, 
              private myOrderService: MyOrderService,
              private shopService: ShopService) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.params.orderId;
    this.myOrderService.getByOrderId(this.orderId).subscribe(response=>{
      console.log(response);
      this.order = response;
      this.shopService.getByProductId(this.order.productId).subscribe(product=>{
        console.log(product);
        this.product = product;
      })
    })
  }
  getDisplayImage(product)
  {
    return product.attributes.image_url.split("\|")[0].trim();
  }
}
