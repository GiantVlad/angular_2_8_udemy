import {Action} from "@ngrx/store";

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';

export class Login implements Action {
  readonly type = LOGIN;
  constructor( public payload: {
    email: string,
    id: string,
    token: string,
    tokenExpiration: Date
  }) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthAction = Login | Logout;
