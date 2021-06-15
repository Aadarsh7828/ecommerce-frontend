import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemService } from '../services/cart-item.service';
import { SellerOrderService } from '../services/seller-order.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-seller-order',
  templateUrl: './seller-order.component.html',
  styleUrls: ['./seller-order.component.css']
})
export class SellerOrderComponent implements OnInit {

  order = null;
  orders = [];
  numberOfElements:number;
  totalElements: number;
  totalPages:number
  pageNumber:number;
  offset:number;
  entryPerPage = 12;
  sortOrder = "NONE";
  sellerId= 2707;
  constructor(private route: ActivatedRoute, 
    private sellerOrderService:SellerOrderService ) { }

    ngOnInit(): void {
      console.log("fetching orders");
      this.sellerOrderService.getAll(this.sellerId, 0,this.entryPerPage, this.sortOrder).subscribe(data=>{
        if(data.content == false)
        {
          alert("failed to fetch data");
          return;
        }
         this.refreshNavButton(data);
         console.log(this.orders);
      });
      
      // this.orders = this.sellerOrderService.getMockData();
      // console.log(this.orders);
    }
    public loadScript(url: string) {
      const body = <HTMLDivElement> document.body;
      const script = document.createElement('script');
      script.innerHTML = '';
      script.src = url;
      script.async = false;
      script.defer = true;
      body.appendChild(script);
    }
    refreshNavButton(data)
    {
        this.orders = data.content;
        this.numberOfElements = data.numberOfElements;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.pageNumber = data.pageNumber;
        this.offset = data.offset;
    }
  
    performSearch(keywords)
    {
      console.log("perform search:"+ keywords);
    }
    resetSearch()
    {
      console.log('reset search');
    }
    previousPage()
    {
      if(this.pageNumber === 0)
        return;
        this.sellerOrderService.getAll(this.sellerId,this.pageNumber-1, this.entryPerPage,this.sortOrder).subscribe(data=>{
          this.refreshNavButton(data);
        });
    }
    firstPage()
    {
      if(this.pageNumber ===0)
      return;
      this.sellerOrderService.getAll(this.sellerId,0, this.entryPerPage, this.sortOrder).subscribe(data=>{
        this.refreshNavButton(data);
      }
      );
    }
    lastPage()
    {
      if(this.pageNumber === this.totalPages-1)
      return;
      this.sellerOrderService.getAll(this.sellerId,this.totalPages-1, this.entryPerPage, this.sortOrder).subscribe(data=>{
        this.refreshNavButton(data);
      });
    }
    nextPage()
    {
      if(this.pageNumber === this.totalPages-1)
      return;
      this.sellerOrderService.getAll(this.sellerId,this.pageNumber+1, this.entryPerPage, this.sortOrder).subscribe(data=>{
        this.refreshNavButton(data);
      });
    }
    getDisplayImage(product)
    {
      //return product.attributes.image_url.split("\|")[0].trim();
    }
   
    getScores(selectedProduct)
    {
      // let score = Math.floor(1+(Math.random()*4));
      // let scores = new Array(score);
      // return scores;
    }
    getUrl(id)
    {
      return '/details/' + id;
    }
   
    sortOrderChange(order)
    {
      // if(order === 'default')
      //   order = 'NONE';
      // this.sortOrder = order;
      // this.sellerOrderService.getAll(0,this.entryPerPage, this.sortOrder).subscribe(data=>{
      //   if(data.content == false)
      //   {
      //     alert("failed to fetch data");
      //     return;
      //   }
      //    this.refreshNavButton(data);
      // });
    }
  getProfileImage(name:string)
  {
  //  return `assets/images/profile/${name.substr(0,1).toUpperCase()}.png`;
  }
  changeStatus(status:string)
  {
    this.sellerOrderService.changeStatus(status)
  }
}
