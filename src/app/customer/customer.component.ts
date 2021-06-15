import { Component, OnInit } from '@angular/core';
import {Customer} from './../models/customer.model';
import {CustomerService} from './../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[] = [];
  currentViewList:Customer[] =[];
  numberOfElements:number;
  totalElements: number;
  totalPages:number
  pageNumber:number;
  offset:number;
  entryPerPage = 20;
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
  	this.customerService.getAll(0,this.entryPerPage).subscribe(data=>{
      if(data.content == false)
      {
        return;
      }
       this.refreshNavButton(data);
  	});
  }
  refreshNavButton(data)
  {
      this.customers = data.content;
      this.currentViewList = this.customers;
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
      this.customerService.getAll(this.pageNumber-1, this.entryPerPage).subscribe(data=>{
        this.refreshNavButton(data);
      });
  }
  firstPage()
  {
    if(this.pageNumber ===0)
    return;
    this.customerService.getAll(0, this.entryPerPage).subscribe(data=>{
      this.refreshNavButton(data);
    }
    );
  }
  lastPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    this.customerService.getAll(this.totalPages-1, this.entryPerPage).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }
  nextPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    // send request for next page 
    // increment page count if success else show error
    this.customerService.getAll(this.pageNumber+1, this.entryPerPage).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }

}
