import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  hasError = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthServiceService) {}

  ngOnInit(): void {}



  onSubmit(): void {
    console.log('Form Submitted'); // Debugging line
  
    this.hasError = false;
  
    if (this.signupForm.invalid) {
      this.hasError = true;
      this.errorMessage = 'All fields are required';
      return;
    }
  
    if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
      this.hasError = true;
      this.errorMessage = 'Passwords do not match';
      return;
    }
  
    // Clear any previous error
    this.errorMessage = '';
  
    // Send http request to create user
    const { username, firstName, lastName, password } = this.signupForm.value;
  
    if (username && firstName && lastName && password) {
      this.auth.signup(username, firstName, lastName, password)
  .subscribe({
    next: () => {
      console.log('User successfully created');
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Error creating account:', err);
      this.router.navigate(['/login']); // Navigate to login even on error
    }
  });

    } 
  }
  

}
