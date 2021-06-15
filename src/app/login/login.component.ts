import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {

  }
  onSubmit(frm)
  {
    console.log("username:"+ frm.value.username);
    console.log("password:"+ frm.value.password);
    this.loginService.generateToken(frm.value.username, frm.value.password).subscribe(
      (response:any)=>{
        console.log("token generated");
        console.log(response.body.token);
        this.loginService.loginUser(response.body.token);
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
