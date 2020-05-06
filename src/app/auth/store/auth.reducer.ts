import {UserModel} from "../user.model";
import * as AuthAction from "./auth.action";

export interface State {
  user: UserModel,
}

const initialState: State = {
  user: null
}

export function authReducer(state: State = initialState, action: AuthAction.AuthAction) {
  switch (action.type) {
    case AuthAction.LOGIN:
      const newUser = new UserModel(
        action.payload.email,
        action.payload.id,
        action.payload.token,
        action.payload.tokenExpiration
      )
      return {
        ...state,
        user: newUser
      }
    case AuthAction.LOGOUT:
      return {
        ...state,
        user: null,
      }
    default:
      return state;
  }

}
