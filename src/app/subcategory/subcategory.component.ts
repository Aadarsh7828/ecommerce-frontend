import { Component, OnInit } from '@angular/core';
import {Subcategory} from './../models/subcategory.model';
import {SubcategoryService} from './../services/subcategory.service';
@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
	subcategories: Subcategory[];
  constructor(private subcategoryService: SubcategoryService) { }

  ngOnInit(): void {
  	this.subcategoryService.getAll().subscribe(data =>{
  		this.subcategories = data;
  	});

  }
  testMethod()
  {
 
  }
}
