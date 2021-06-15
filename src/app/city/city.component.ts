import { Component, OnInit } from '@angular/core';
import {City} from './../models/city.model';
import {CityService} from './../services/city.service';
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
	cities: City[] = [];
  currentViewList:City[] =[];
  numberOfElements:number;
  totalElements: number;
  totalPages:number
  pageNumber:number;
  offset:number;
  entryPerPage = 20;
  constructor(private cityService: CityService) { }

  ngOnInit(): void {
  	this.cityService.getAll(0,this.entryPerPage).subscribe(data=>{
      if(data.content == false)
      {
        return;
      }
       this.refreshNavButton(data);
  	});
  }
  refreshNavButton(data)
  {
      this.cities = data.content;
      this.currentViewList = this.cities;
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
      this.cityService.getAll(this.pageNumber-1, this.entryPerPage).subscribe(data=>{
        this.refreshNavButton(data);
      });
  }
  firstPage()
  {
    if(this.pageNumber ===0)
    return;
    this.cityService.getAll(0, this.entryPerPage).subscribe(data=>{
      this.refreshNavButton(data);
    }
    );
  }
  lastPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    this.cityService.getAll(this.totalPages-1, this.entryPerPage).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }
  nextPage()
  {
    if(this.pageNumber === this.totalPages-1)
    return;
    // send request for next page 
    // increment page count if success else show error
    this.cityService.getAll(this.pageNumber+1, this.entryPerPage).subscribe(data=>{
      this.refreshNavButton(data);
    });
  }

}
