import {UserModel} from "../user.model";
import * as AuthAction from "./auth.action";

export interface State {
  user: UserModel,
  authError: string,
  loading: boolean,
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
}

export function authReducer(state: State = initialState, action: AuthAction.AuthAction) {
  switch (action.type) {
    case AuthAction.AUTH_SUCCESS:
      const newUser = new UserModel(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.tokenExpiration
      )
      return {
        ...state,
        user: newUser,
        authError: null,
        loading: false,
      }
    case AuthAction.LOGOUT:
      return {
        ...state,
        user: null,
      }
    case AuthAction.LOGIN_START:
    case AuthAction.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      }
    case AuthAction.AUTH_ERROR:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      }
    case AuthAction.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      }
    default:
      return state;
  }
}
