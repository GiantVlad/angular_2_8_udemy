import {Action} from "@ngrx/store";

export const LOGIN_START = '[Auth] Login Start';
export const AUTO_LOGIN = '[Auth] Auto Login';
export const SIGNUP_START = '[Auth] Signup Start';
export const AUTH_ERROR = '[Auth] Auth Error';
export const AUTH_SUCCESS = '[Auth] Auth Success';
export const LOGOUT = '[Auth] Logout';
export const CLEAR_ERROR = '[Auth] Clear Error';

export class AuthSuccess implements Action {
  readonly type = AUTH_SUCCESS;
  constructor( public payload: {
    email: string,
    id: string,
    token: string,
    tokenExpiration: Date,
    redirect: boolean,
  }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;
  constructor( public payload: {
    email: string,
    password: string,
  }) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;
  constructor( public payload: {
    email: string,
    password: string,
  }) {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor( public payload: string) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type AuthAction =
  LoginStart
  | AuthError
  | AuthSuccess
  | Logout
  | SignupStart
  | ClearError
  | AutoLogin;
