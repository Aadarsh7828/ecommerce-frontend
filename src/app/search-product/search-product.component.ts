import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItemService } from '../services/cart-item.service';
import { LoginService } from '../services/login.service';
import { ShopService } from '../services/shop.service';

@Component({
  selector: 'app-search-product',
  templateUrl: './search-product.component.html',
  styleUrls: ['./search-product.component.css']
})
export class SearchProductComponent implements OnInit {
  selectedProduct = null;
  products = [];
  numberOfElements:number;
  totalElements: number;
  totalPages:number
  pageNumber:number;
  offset:number;
  entryPerPage = 12;
  sortOrder = "NONE";
  searchWord = "";
  constructor(private productService: ShopService,
              private cartItemService: CartItemService,
              private loginService: LoginService,
              private route : ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.searchWord= this.route.snapshot.params.query;
    console.log(this.searchWord);
  	this.productService.searchProduct(this.searchWord,0,this.entryPerPage, this.sortOrder).subscribe(data=>{
      if(data.content == false)
      {
        alert("No Product found");
        return;
      }
       this.refreshNavButton(data);
       console.log(this.products);
  	});
  }
  check()
  {
    this.route.params.subscribe( params => {
      if(params.query !== this.searchWord)
      {
        location.reload();
      }
    } );
    
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
      this.productService.searchProduct(this.searchWord,this.pageNumber-1, this.entryPerPage,this.sortOrder).subscribe(data=>{
        this.refreshNavButton(data);
      });
  }
  firstPage()
  {
    if(this.pageNumber ===0)
    return;
    this.productService.searchProduct(this.searchWord,0,this.entryPerPage, this.sortOrder).subscribe(data=>{
      this.refreshNavButton(data);
    }
    );
  }
  lastPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    this.productService.searchProduct(this.searchWord,this.totalPages-1,this.entryPerPage, this.sortOrder).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }
  nextPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    // send request for next page 
    // increment page count if success else show error
    this.productService.searchProduct(this.searchWord,this.pageNumber+1,this.entryPerPage, this.sortOrder).subscribe(data=>{
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
    this.productService.searchProduct(this.searchWord,0,this.entryPerPage, this.sortOrder).subscribe(data=>{
      if(data.content == false)
      {
        alert("failed to fetch data");
        return;
      }
       this.refreshNavButton(data);
  	});
  }

}
