import { Component, OnInit } from '@angular/core';
import {PincodeService} from './../services/pincode.service';
import {Pincode} from './../models/pincode.model';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.css']
})
export class PincodeComponent implements OnInit {
	pincodes: Pincode[] = [];
  currentViewList:Pincode[] =[];
  numberOfElements:number;
  totalElements: number;
  totalPages:number
  pageNumber:number;
  offset:number;
  entryPerPage = 20;
  constructor(private pincodeService: PincodeService) { }

  ngOnInit(): void {
  	this.pincodeService.getAll(0,this.entryPerPage).subscribe(data=>{
      if(data.content == false)
      {
        return;
      }
       this.refreshNavButton(data);
  	});
  }
  refreshNavButton(data)
  {
      this.pincodes = data.content;
      this.currentViewList = this.pincodes;
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
      this.pincodeService.getAll(this.pageNumber-1, this.entryPerPage).subscribe(data=>{
        this.refreshNavButton(data);
      });
  }
  firstPage()
  {
    if(this.pageNumber ===0)
    return;
    this.pincodeService.getAll(0, this.entryPerPage).subscribe(data=>{
      this.refreshNavButton(data);
    }
    );
  }
  lastPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    this.pincodeService.getAll(this.totalPages-1, this.entryPerPage).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }
  nextPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    // send request for next page 
    // increment page count if success else show error
    this.pincodeService.getAll(this.pageNumber+1, this.entryPerPage).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }
}
