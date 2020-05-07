import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import {Store} from "@ngrx/store";
import * as fromApp from '../store/app.reducer'
import * as AuthActions from './store/auth.action'

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
  subscriptions: Subscription[];

  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscriptions = [];
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
    const storeSub = this.store.select('auth').subscribe(authData => {
      this.isLoading = authData.loading;
      this.errorMessage = authData.authError;
      if (this.errorMessage) {
        this.showAlert(this.errorMessage);
      }
    });
    this.subscriptions.push(storeSub);
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
      this.store.dispatch( new AuthActions.LoginStart(
        {
          email,
          password
        }
      ));
    } else {
      this.store.dispatch( new AuthActions.SignupStart(
        {
          email,
          password
        }
      ));
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    return this.loginForm.get(fieldName).invalid && this.loginForm.get(fieldName).touched;
  }

  onHandleClose(): void {
    this.store.dispatch(new AuthActions.ClearError());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private showAlert(message: string) {
    const alertFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertFactory);
    componentRef.instance.message = message;
    const alertCloseSub = componentRef.instance.close.subscribe(() => {
      hostViewContainerRef.clear();
    });
    this.subscriptions.push(alertCloseSub);
  }
}
