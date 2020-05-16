import * as RecipeActions from "./recipe.actions";
import {RecipeModel} from "../recipe.model";

export interface State {
  recipes: RecipeModel[],
}

const initialState: State = {
  recipes: [],
}

export function recipeReducer(state: State = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload],
      };
    case RecipeActions.ADD_RECIPE:
      const id = findMaxId(state.recipes) + 1;

      let newRecipe = { ...action.payload, id}
      return {
        ...state,
        recipes: [...state.recipes, newRecipe],
      };
    case RecipeActions.UPDATE_RECIPE:
      let updatedRecipes = [...state.recipes];
      updatedRecipes = updatedRecipes.map(recipe => {
        if (+action.payload.id === recipe.id) {
          return action.payload.newRecipe;
        }
        return recipe;
      });
      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipeActions.DELETE_RECIPE:
      const newRecipes = state.recipes.filter(recipe => +action.payload.id !== recipe.id);
      return {
        ...state,
        recipes: newRecipes,
      };
    case RecipeActions.STORE_RECIPES:
    default:
      return state
  }
}

function findMaxId(recipes): number {
  let maxId = recipes.length > 0 ? recipes[0].id : 0;
  recipes.forEach((item: RecipeModel) => {
    if (item.id !== undefined && item.id > maxId) {
      maxId = item.id;
    }
  });
  return maxId;
}
