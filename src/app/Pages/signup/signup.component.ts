import { Component, OnInit } from '@angular/core';
import { FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
username = new FormControl('');
firstName = new FormControl('');
lastName = new FormControl('');
password = new FormControl('');
confirmPassword = new FormControl('');
hasError = false;
errorMessage = '';




constructor(private router: Router, private auth: AuthServiceService){}


ngOnInit(): void{};

onsubmit(e: Event){
  //Set Defaults
  e.preventDefault();
  this.hasError = false;

  //Check fields for values
  if(
    !this.username.value || 
    !this.firstName.value ||
    !this.lastName.value ||
    !this.password.value ||
    !this.confirmPassword.value
  ){
    this.hasError = true;
    this.errorMessage = 'Passwords do not match';
    return;
  }

  //Check if passwords match
  if (this.password.value !== this.confirmPassword.value){
    this.hasError = true;
    this.errorMessage = 'Passwords do not match';
    return;
  }

  //Send http request to create user

  this.auth
  .signup(this.username.value,
    this.firstName.value,
    this.lastName.value,
    this.password.value
    )
    .subscribe({
      next: (v) => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.hasError = true;
        this.errorMessage = 'Error creating account, please check your details';
      }
    });
}
}
