import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Category} from './../models/category.model';
import {CategoryService} from './../services/category.service';
import {ActivatedRoute, Params} from '@angular/router';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
	categories: Category[];
  selectedCategory  = null;
  searchedCategory:Category[] = [];
  nonViewList = null;
  currentViewList =null;
  temp:Category[] = null;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
  	this.categoryService.getAll().subscribe(data =>{
  		this.categories = data;
      this.currentViewList = this.categories;
  	}, error=>{
      console.log(error);
    });
  }

  deleteCategory(id)
  {
    let idx = -1;
    for(let i = 0;i < this.categories.length;++i)
    {
      if(this.categories[i].id === id)
      {
        idx = i;
        break;
      }
    }
    if(idx >= this.categories.length)
      return;
    this.selectedCategory = new Category();
    this.selectedCategory.id = this.categories[idx].id;
    this.selectedCategory.name = this.categories[idx].name;
    this.selectedCategory.description = this.categories[idx].description;
  }
  editCategory(id)
  {
     let idx = -1;
    for(let i = 0;i < this.categories.length;++i)
    {
      if(this.categories[i].id === id)
      {
        idx = i;
        break;
      }
    }
    if(idx >= this.categories.length)
      return;
     this.selectedCategory = new Category();
    this.selectedCategory.id = this.categories[idx].id;
    this.selectedCategory.name = this.categories[idx].name;
    this.selectedCategory.description = this.categories[idx].description;
  }
  finalEditCategory(frm)
  {
    let category = new Category();
    category.name = frm.value.name;
    category.description = frm.value.description;
    category.id = this.selectedCategory.id;
     try
    {
      this.categoryService.update(category, category.id).subscribe(data=>{
              let idx = 0;
      for(idx = 0;idx< this.categories.length;++idx)
      {
        if(this.categories[idx].id === category.id)
        {
          break;
        }
      }
      if(idx >= this.categories.length)
        return;
      this.categories[idx] = category;
      },
      error=>{
        console.log("error");
        console.log(error);
      });
    }
    catch(error)
    {
      console.log("Error: "+ error);
    }

  }
  finalDeleteCategory(id)
  {
    try
    {
      this.categoryService.delete(id).subscribe(data=>{
       let idx = 0;
      for(idx = 0;idx< this.categories.length;++idx)
      {
        if(this.categories[idx].id === id)
        {
          break;
        }
      }
      if(idx >= this.categories.length)
        return;
      let cat =this.categories.splice(idx, 1);
      },
      error=>{
        console.log("error");
        console.log(error);
      });
      
     }
    catch(error)
    {
      console.log("Error: "+ error);
    }

  }
  finalAddCategory(frm)
  {
    let category: Category = new Category();
    category.id = frm.value.id;
    category.name = frm.value.name;
    category.description = frm.value.description;
    this.categoryService.add(category).subscribe(data=>{
      if(!data)
    {
       alert("Failed to add");
       return;
    }
    else
    {
      this.categories.push(category);
      frm.resetForm();
    }
    }, 
    error=>{
      console.log("error while adding");
      console.log(error);
    });

  }
  performSearch(keyword)
  {  
    // match and add in searchedCategory
    // change reference of currentViewList from categories to searchedCategory
    let regExp:RegExp[] = [];
    let words = keyword.split(' ');
    for(let word of words)
    {
      regExp.push(new RegExp(word, 'ig'));
    }
    this.searchedCategory = [];
    for(let category of this.categories)
    {
      for(let reg of regExp)
      {
        if(reg.test(category.name))
         {
          this.searchedCategory.push(category);
          break;
         }
      }
    }
    this.currentViewList = this.searchedCategory;
  }
  resetSearch()
  {
    this.currentViewList = this.categories;
  }
}
