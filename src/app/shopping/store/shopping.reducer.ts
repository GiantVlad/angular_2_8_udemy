import {IngredientModel} from "../../shared/ingredient.model";
import * as ShoppingActions from './shopping.action'

export interface AppState {
  shoppingList: State,
}

export interface State {
  ingredients: IngredientModel[],
  selectedIdx: number,
}

const initialState: State = {
  ingredients: [
    new IngredientModel('Scumbria', 8),
    new IngredientModel('Apple', 2),
  ],
  selectedIdx: -1,
}

export function shoppingReducer (state:State = initialState, action: ShoppingActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingActions.UPDATE_INGREDIENT:
      const uIndex = [...state.ingredients].findIndex(ing => ing.selected);
      const updatedIngredients = [...state.ingredients];
      const updatedIngredient = {...updatedIngredients[uIndex], ...action.payload};
      updatedIngredients[uIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients,
        selectedIdx: -1
      };
    case ShoppingActions.DELETE_INGREDIENT:
      const index = [...state.ingredients].findIndex(ing => ing.selected);
      const dIngredients = [...state.ingredients];
      if (index !== -1) {
        dIngredients.splice(index, 1);
      }
      return {
        ...state,
        ingredients: dIngredients,
        selectedIdx: -1
      };
    case ShoppingActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingActions.START_EDITING:
      const startIngredients = [...state.ingredients];
      startIngredients.forEach((ingr, idx) => {
        if (ingr.selected) {
          startIngredients[idx] = {...startIngredients[idx], selected: false}
        }
      });
      startIngredients[action.payload] = {...startIngredients[action.payload], selected: true};
      return {
        ...state,
        ingredients: startIngredients,
        selectedIdx: action.payload
      };
    case ShoppingActions.STOP_EDITING:
      const stopIngredients = [...state.ingredients];
      stopIngredients.forEach((ingr, idx) => {
        if (ingr.selected) {
          stopIngredients[idx] = {...stopIngredients[idx], selected: false}
        }
      });
      return {
        ...state,
        ingredients: stopIngredients,
        selectedIdx: -1
      };
    default:
      return state;
  }
}
