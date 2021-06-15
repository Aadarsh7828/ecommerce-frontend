import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerRegistrationService } from '../services/customer-registration.service';


@Component({
  selector: 'app-customer-registration-form',
  templateUrl: './customer-registration-form.component.html',
  styleUrls: ['./customer-registration-form.component.css']
})
export class CustomerRegistrationFormComponent implements OnInit {
  
  constructor(private customerRegistrationService:CustomerRegistrationService,
              private router : Router) { }

  ngOnInit(): void {
  }
  onSubmit(frm)
  {
    let username = frm.value.username.trim();
    let password = frm.value.password.trim();
    console.log(username);
    console.log(password);
    this.customerRegistrationService.registerUser(username, password).subscribe(
      (response:any)=>{
        alert("confirmation link sent to email");
        this.router.navigate(['/login']);
      },
      (error)=>{
        alert("error in input");
      }
    );
  }
}
