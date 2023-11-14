import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hasError = false;
  errorMessage = '';

  constructor(private router: Router, private auth: AuthServiceService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.hasError = false;

    if (this.loginForm.invalid) {
      this.hasError = true;
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    this.auth.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (v) => {
        const { token } = v as any;
        localStorage.setItem('x-auth-token', token);
        this.router.navigate(['/home']);
      },
      error: (e) => {
        this.hasError = true;
        this.errorMessage = 'Error Logging in, check username and password';
      }
    });
  }
}
