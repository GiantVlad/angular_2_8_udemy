import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthResponse, AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  isLoginMode = true;
  loginForm: FormGroup;
  errorMessage: string = null;
  authSubscription: Observable<AuthResponse>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.authSubscription = this.authService.login(email, password);
    } else {
      this.authSubscription = this.authService.singUp(email, password);
    }
    this.authSubscription.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.loginForm.reset();
        this.router.navigate(['/recipes']);
      },
      error => {
        console.log(error);
        this.isLoading = false;
        this.errorMessage = error;
      });
  }

  isFieldInvalid(fieldName: string): boolean {
    return this.loginForm.get(fieldName).invalid && this.loginForm.get(fieldName).touched;
  }

  onHandleClose(): void {
    this.errorMessage = null;
  }
}
