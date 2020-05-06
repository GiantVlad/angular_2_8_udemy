import * as fromShopping from "../shopping/store/shopping.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  shoppingList: fromShopping.State,
  auth: fromAuth.State,
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShopping.shoppingReducer,
  auth: fromAuth.authReducer,
}
