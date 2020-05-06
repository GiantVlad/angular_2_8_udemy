import {Action} from "@ngrx/store";
import {IngredientModel} from "../../shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping] Delete Ingredient';
export const SELECT_INGREDIENT = '[Shopping] Select Ingredient';
export const START_EDITING = '[Shopping] Start Editing';
export const STOP_EDITING = '[Shopping] Stop Editing';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;
  constructor(public payload: IngredientModel) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;
  constructor(public payload: IngredientModel[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;
  constructor(public payload: IngredientModel) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
  constructor() {}
}

export class StartEditing implements Action {
  readonly type = START_EDITING;
  constructor(public payload: number) {}
}

export class StopEditing implements Action {
  readonly type = STOP_EDITING;
  constructor() {}
}

export type ShoppingListActions =
  AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEditing
  | StopEditing;
