import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CartItemService } from '../services/cart-item.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  loggedIn = false;
  cartItemCount = 0;
  private loginSubcription :Subscription;
  constructor(private loginService: LoginService,
              private cartItemService: CartItemService,
              private router : Router
              ) { }

  ngOnInit(): void {
    this.loginSubcription = this.loginService.loggedIn.subscribe(response=>{
      this.loggedIn = response;
    });
    this.cartItemService.getItemCount().subscribe(response=>{
      this.cartItemCount = response.count;
   
    })

  }
  ngOnDestroy()
  {
    this.loginSubcription.unsubscribe();
  }
  isLoggedIn()
  {
    return this.loginService.isLoggedIn();
  }
  getCartItemCount()
  {
    if(this.loginService.isLoggedIn())
    return this.cartItemCount;
    return 0;
  }
  onSubmit(frm:NgForm)
  {
    let searchWord = frm.value.searchWord;
    if(searchWord == undefined || searchWord == null || searchWord.length== 0)
    {
      alert("Search field empty");
      return;
    }
   // frm.resetForm();
    searchWord  = searchWord.trim();
    let url = `/search/${searchWord}`;
    //this.router.navigate([`/${url}`]);
    window.location.href  = url;
  }
}
