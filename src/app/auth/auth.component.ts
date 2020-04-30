import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthResponse, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoading = false;
  isLoginMode = true;
  loginForm: FormGroup;
  errorMessage: string = null;
  authSubscription: Observable<AuthResponse>;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
  private alertCloseSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
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
        // this.errorMessage = error;
        this.showAlert(error);
      });
  }

  isFieldInvalid(fieldName: string): boolean {
    return this.loginForm.get(fieldName).invalid && this.loginForm.get(fieldName).touched;
  }

  onHandleClose(): void {
    this.errorMessage = null;
  }

  ngOnDestroy(): void {
    if (this.alertCloseSub) {
      this.alertCloseSub.unsubscribe();
    }
  }

  private showAlert(message: string) {
    const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertFactory);
    componentRef.instance.message = message;
    this.alertCloseSub = componentRef.instance.close.subscribe(() => {
      this.alertCloseSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
