import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl : './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  
   constructor(private loginService: LoginService)
   {
   
   }
  ngOnDestroy(): void {
    this.loginService.logout();
  }
  ngOnInit(): void {
    
  }

   isLoggedIn()
   {
     let username = this.loginService.getUsername();
     if(username != null)
     return username;
     return this.loginService.isLoggedIn();
   }
   logout()
   {
     this.loginService.logout();
   }
   
}
