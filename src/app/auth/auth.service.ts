import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {UserModel} from './user.model';
import {Router} from '@angular/router';
import { environment } from '../../environments/environment'

export interface AuthResponse  {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly apiKey = environment.firebaseAPIKey;
  private errorMessage: string;
  private tokenExpirationTimer: any;
  public user = new BehaviorSubject<UserModel>(null);
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.errorMessage = 'An unknown error occurred.';
  }

  autoLogin(): void {
    const userData: {
      email: string
      id: string,
      _token: string,
      tokenExpiration: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loggedUser = new UserModel(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData.tokenExpiration)
    );
    this.user.next(loggedUser);
    const expiresDuration = new Date(userData.tokenExpiration).getTime() - new Date().getTime();
    this.autoLogout(expiresDuration);
  }

  singUp(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
      { email, password, returnSecureToken: true }
      ).pipe(
      catchError(this.errorHandler),
      tap((response) => {
        this.handlerAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`,
      { email, password, returnSecureToken: true }
    ).pipe(
      catchError(this.errorHandler),
      tap((response) => {
        this.handlerAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
      })
    );
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handlerAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expDate = new Date( new Date().getTime() + expiresIn * 1000);
    const userModel = new UserModel(
      email,
      userId,
      token,
      expDate
    );
    this.user.next(userModel);
    localStorage.setItem('userData', JSON.stringify(userModel));
    this.autoLogout(expiresIn * 1000);
  }

  private errorHandler(errorResponse: HttpErrorResponse) {
    if(!errorResponse.error || !errorResponse.error.error) {
      return throwError(this.errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_NOT_FOUND':
        this.errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        this.errorMessage = 'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        this.errorMessage = 'The user account has been disabled by an administrator.';
        break;
      case 'EMAIL_EXISTS':
        this.errorMessage = 'The email address is already in use by another account.';
        break;
      case 'OPERATION_NOT_ALLOWED':
        this.errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        this.errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
    }
    return throwError(this.errorMessage);
  }
}
