import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SellerLoginService } from '../services/seller-login.service';

@Component({
  selector: 'app-seller-login',
  templateUrl: './seller-login.component.html',
  styleUrls: ['./seller-login.component.css']
})
export class SellerLoginComponent implements OnInit {

  constructor(private sellerLoginService: SellerLoginService, private router: Router) { }

  ngOnInit(): void {

  }
  onSubmit(frm)
  {
    console.log("username:"+ frm.value.username);
    console.log("password:"+ frm.value.password);
    this.sellerLoginService.generateToken(frm.value.username, frm.value.password).subscribe(
      (response:any)=>{
        console.log("token generated");
        console.log(response.body.token);
        this.sellerLoginService.loginUser(response.body.token);
        // extract token and store in variable
        this.router.navigate(['']);
      },
      (error)=>{
        console.log("error");
        console.log(error);
      }
    );
  }

}
