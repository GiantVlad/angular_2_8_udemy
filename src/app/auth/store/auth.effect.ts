import {Actions, Effect, ofType} from "@ngrx/effects";
import  * as AuthActions from './auth.action'
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {AuthService} from "../auth.service";
import {HttpClient} from "@angular/common/http";
import { environment } from '../../../environments/environment'
import {Injectable} from "@angular/core";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {UserModel} from "../user.model";

export interface AuthResponse  {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered?: boolean;
}

const handleError = (errorResponse) => {
  let errorMessage = 'An unknown error occurred.';
  if(!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthError(errorMessage));
  }
  switch (errorResponse.error.error.message) {
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'The password is invalid or the user does not have a password.';
      break;
    case 'USER_DISABLED':
      errorMessage = 'The user account has been disabled by an administrator.';
      break;
    case 'EMAIL_EXISTS':
      errorMessage = 'The email address is already in use by another account.';
      break;
    case 'OPERATION_NOT_ALLOWED':
      errorMessage = 'Password sign-in is disabled for this project.';
      break;
    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
      errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
      break;
  }
  return of(new AuthActions.AuthError(errorMessage));
}

const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: number,
) => {

  const tokenExpiration = new Date( new Date().getTime() + expiresIn * 1000);

  const userModel = new UserModel(
    email,
    userId,
    token,
    tokenExpiration
  );
  localStorage.setItem('userData', JSON.stringify(userModel));

  return new AuthActions.AuthSuccess({
    email,
    id: userId,
    token,
    tokenExpiration,
    redirect: true,
  });
}

@Injectable()
export  class AuthEffect {
  readonly uri = 'https://identitytoolkit.googleapis.com/v1/'
  @Effect()
  authSingUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignupStart) => {
      return this.http.post<AuthResponse>(
        `${this.uri}accounts:signUp?key=${environment.firebaseAPIKey}`,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        tap(resData => {
          this.authService.setAutoLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuthentication(resData.email, resData.localId, resData.idToken,  +resData.expiresIn);
        }),
        catchError(errorResponse => {
          return handleError(errorResponse);
        })
      );
    }
  ));

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponse>(
        `${this.uri}accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        })
        .pipe(
          tap(resData => {
            this.authService.setAutoLogoutTimer(+resData.expiresIn * 1000);
          }),
          map(resData => {
            return handleAuthentication(resData.email, resData.localId, resData.idToken,  +resData.expiresIn);
          }),
          catchError(errorResponse => {
            return handleError(errorResponse);
          })
      );
    }),

  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTH_SUCCESS),
    tap((authSuccessAction: AuthActions.AuthSuccess) => {
      if (authSuccessAction.payload.redirect) {
        return this.router.navigate(['/']);
      }
      return;
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(()=> {
      this.authService.resetAutoLogoutTimer();
      localStorage.removeItem('userData');
      return this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(()=> {
      const userData: {
        email: string
        id: string,
        _token: string,
        tokenExpiration: string
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return {type: 'DUMMY'};
      }
      const loggedUser = new UserModel(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData.tokenExpiration)
      );
      if(loggedUser.token) {
        const expiresDuration = new Date(userData.tokenExpiration).getTime() - new Date().getTime();
        this.authService.setAutoLogoutTimer(expiresDuration);

        return new AuthActions.AuthSuccess(
          {
            email: userData.email,
            id: userData.id,
            token: userData._token,
            tokenExpiration: new Date(userData.tokenExpiration),
            redirect: false
          }
        );
      }
      return {type: 'DUMMY'};
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {
  }
}
