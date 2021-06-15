import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CartItemService } from '../services/cart-item.service';
import { LoginService } from '../services/login.service';
import { ShopService } from '../services/shop.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  selectedProduct = null;
  products = [];
  numberOfElements:number;
  totalElements: number;
  totalPages:number
  pageNumber:number;
  offset:number;
  entryPerPage = 12;
  sortOrder = "NONE";
  constructor(private productService: ShopService,
              private cartItemService: CartItemService,
              private loginService: LoginService,
              ) { }

  ngOnInit(): void {
  	this.productService.getAll(0,this.entryPerPage, this.sortOrder).subscribe(data=>{
      if(data.content == false)
      {
        alert("failed to fetch data");
        return;
      }
       this.refreshNavButton(data);
       console.log(this.products);
  	});
  }
  refreshNavButton(data)
  {
      this.products = data.content;
      this.numberOfElements = data.numberOfElements;
      this.totalElements = data.totalElements;
      this.totalPages = data.totalPages;
      this.pageNumber = data.pageable.pageNumber;
      this.offset = data.pageable.offset;
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
      this.productService.getAll(this.pageNumber-1, this.entryPerPage,this.sortOrder).subscribe(data=>{
        this.refreshNavButton(data);
      });
  }
  firstPage()
  {
    if(this.pageNumber ===0)
    return;
    this.productService.getAll(0, this.entryPerPage, this.sortOrder).subscribe(data=>{
      this.refreshNavButton(data);
    }
    );
  }
  lastPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    this.productService.getAll(this.totalPages-1, this.entryPerPage, this.sortOrder).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }
  nextPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    // send request for next page 
    // increment page count if success else show error
    this.productService.getAll(this.pageNumber+1, this.entryPerPage, this.sortOrder).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }
  getDisplayImage(product)
  {
  	return product.attributes.image_url.split("\|")[0].trim();
  }
  detailModal(product)
  {
    this.selectedProduct = product;
    console.log("selected:"+ product.title);
  }
  getScores(selectedProduct)
  {
    let score = Math.floor(1+(Math.random()*4));
    let scores = new Array(score);
    return scores;
  }
  getUrl(id)
  {
    return '/details/' + id;
  }
  addToCart(productId)
  {
    if(!this.loginService.isLoggedIn())
    {
      alert("login to add in cart");
      // later user will be navigated to login page
    }
    this.cartItemService.add(productId).subscribe(response=>{
      console.log(response);
      alert("add to cart");
    },
    error=>{
      alert("error while add in cart");
      console.log(error);
    }
    );

  }
  sortOrderChange(order)
  {
    if(order === 'default')
      order = 'NONE';
    this.sortOrder = order;
    this.productService.getAll(0,this.entryPerPage, this.sortOrder).subscribe(data=>{
      if(data.content == false)
      {
        alert("failed to fetch data");
        return;
      }
       this.refreshNavButton(data);
  	});
  }
}
