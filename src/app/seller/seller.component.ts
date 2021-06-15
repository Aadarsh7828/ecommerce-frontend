import { Component, OnInit } from '@angular/core';
import {Seller} from './../models/seller.model';
import {SellerService} from './../services/seller.service';
@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {
	sellers: Seller[] = [];
	total = 0;
	currentPageStartingIndex = 0;
	currentPageEndingIndex = 0;
	currentPage = 0;
	entryToDisplay = 20;
	buttonCount = 0;
	currentButton = 0;
	pageButtons = [];
	pageData:Seller[] = [];
	firstTimeLoading = true;
	searchedSeller: Seller[] = [];
  constructor(private sellerService: SellerService) { }

  ngOnInit(): void {
  	this.sellerService.getAll().subscribe((data)=>{
  		this.sellers = data;
  		this.total = data.length;
  		this.currentPageStartingIndex = 0;
  		this.currentPageEndingIndex = this.entryToDisplay - 1;
  		if(data.length%this.entryToDisplay ==0)
  		{
  			this.buttonCount = data.length/this.entryToDisplay;
  		}
  		else
  		{
  			this.buttonCount = data.length/this.entryToDisplay +1;
  		}
  		this.currentButton = 1;
  		for(let idx = 1;idx <= this.buttonCount;++idx)
  		{
  			this.pageButtons.push(idx);
  		}
  		this.pageData = [];
		for(let idx = this.currentPageStartingIndex; idx <= this.currentPageEndingIndex;++idx)
  		{
  		this.pageData.push(this.sellers[idx])
  		}
  	},
  	(error)=>{
  		console.log(error);
  	});
  }
  getPageData()
  {
  	return this.pageData;
  }
  refreshPageData()
  {
  	  	this.pageData = [];
	for(let idx = this.currentPageStartingIndex; idx <= this.currentPageEndingIndex && this.sellers.length;++idx)
  	{
  		this.pageData.push(this.sellers[idx])
  	}
  }
  pageButtonChanged(num)
  {
  	if(num == this.currentPage)
  		return;
  	this.currentPage= num;
  	this.currentPageStartingIndex = (num-1)*this.entryToDisplay;
  	this.currentPageEndingIndex = num*this.entryToDisplay -1;
  	if(this.currentPageEndingIndex > this.sellers.length -1)
  		this.currentPageEndingIndex = this.sellers.length-1;
  	this.refreshPageData();
  }
  performSearch(searchWords)
  {
  	let words = searchWords.trim().split(' '); // ram tom shaym  -> 'ram', 'tom' ,'shaym', 'lucky '
  	let regExps: RegExp[] = [];
  	for(let word of words)
  	{
  		regExps.push(new RegExp(word, "ig"));
  	}
  	this.searchedSeller = [];
  	let matchFound = false;
  	for(let seller of this.sellers)
  	{
  		matchFound = false;
  	Object.keys(seller).forEach(key=>{ //normal loop can used to break as soon as a match is found 
  		for(let reg of regExps)
  		{
  			if(reg.test(seller[key]))
  			{
  				matchFound = true;
  				break;
  			}
  			if(matchFound)
  				break;
  		}
  	});
  		if(matchFound)
  			this.searchedSeller.push(seller);
  	}
  	console.log(this.searchedSeller); // here the view will updated
  }
   resetSearch()
  {
  
  }
  entryCountChange(num)
  {
  	console.log(num);
  	this.entryToDisplay = num;
  	this.currentPageStartingIndex = (this.currentPage-1)*this.entryToDisplay;
  	this.currentPageEndingIndex = this.currentPage*this.entryToDisplay -1;
  	if(this.currentPageEndingIndex > this.sellers.length -1)
  		this.currentPageEndingIndex = this.sellers.length-1;
  	this.refreshPageData();
  }	
  nextPage()
  {
  	if(this.currentPage === this.pageButtons.length)
  		return;
  	console.log("next page");
  }
  previousPage()
  {
  	if(this.currentPage === 1)
  		return;
  	console.log("previous page");
  }
  buttonActiveState(buttonNumber)
  {
  	return buttonNumber === this.currentPage;
  }
}
