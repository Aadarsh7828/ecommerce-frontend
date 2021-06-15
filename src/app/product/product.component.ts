import { Component, OnInit } from '@angular/core';
import { ShopService } from '../services/shop.service';
import {Product} from './../models/product.model';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  currentViewList:Product[] =[];
  numberOfElements:number;
  totalElements: number;
  totalPages:number
  pageNumber:number;
  offset:number;
  entryPerPage = 20;
  sortOrder ="NONE";
  constructor(private productService: ShopService) { }

  ngOnInit(): void {
  	this.productService.getAll(0,this.entryPerPage, this.sortOrder).subscribe(data=>{
      if(data.content == false)
      {
        alert("error in fethcing data from server");
        return;
      }
      
       this.refreshNavButton(data);
  	});
  }
  refreshNavButton(data)
  {
      this.products = data.content;
      this.currentViewList = this.products;
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
      this.productService.getAll(this.pageNumber-1, this.entryPerPage, this.sortOrder).subscribe(data=>{
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
    this.productService.getAll(this.totalPages-1, this.entryPerPage,this.sortOrder).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }
  nextPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    // send request for next page 
    // increment page count if success else show error
    this.productService.getAll(this.pageNumber+1, this.entryPerPage,this.sortOrder).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }
  getDisplayImage(idx)
  {
  	return this.products[idx].attributes.image_url.split("\|")[0].trim();
  }
}
