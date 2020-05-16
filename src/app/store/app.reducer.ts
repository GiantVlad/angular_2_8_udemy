import * as fromShopping from "../shopping/store/shopping.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import * as fromRecipes from "../recipe/store/recipe.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  shoppingList: fromShopping.State,
  auth: fromAuth.State,
  recipes: fromRecipes.State,
}

export const appReducer: ActionReducerMap<AppState> = {
  shoppingList: fromShopping.shoppingReducer,
  auth: fromAuth.authReducer,
  recipes: fromRecipes.recipeReducer,
}
