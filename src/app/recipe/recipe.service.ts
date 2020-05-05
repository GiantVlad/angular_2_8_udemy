import {RecipeModel} from './recipe.model';
import {Injectable} from '@angular/core';
import {IngredientModel} from '../shared/ingredient.model';
import {Subject} from 'rxjs';
import * as ShoppingList from "../shopping/store/shopping.action";
import {Store} from "@ngrx/store";
import * as fromShopping from '../shopping/store/shopping.reducer'

@Injectable()
export class RecipeService {

  private recipes: RecipeModel[] = [];
  recipeChanged = new Subject<RecipeModel[]>();
  constructor(
    private store: Store<fromShopping.AppState>
  ) {}

  getRecipies() {
    return this.recipes.slice();
  }

  setRecipies(recipes: RecipeModel[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes.slice().find(el => el.id === id);
  }

  update(id: number, recipe: RecipeModel): void {
    const idx = this.recipes.findIndex((item: RecipeModel) => item.id === id);
    this.recipes[idx] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  add(recipe: RecipeModel) {
    recipe.id = this.findMaxId() + 1;
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  delete(id: number) {
    const idx = this.recipes.findIndex((item: RecipeModel) => item.id === id);
    this.recipes.splice(idx, 1);
    this.recipeChanged.next(this.recipes.slice());
  }

  addIngredientToShoppingList(ingredients: IngredientModel[]) {
    this.store.dispatch(new ShoppingList.AddIngredients(ingredients))
  }

  private findMaxId(): number {
    let maxId = this.recipes.length > 0 ? this.recipes[0].id : 0;
    this.recipes.forEach((item: RecipeModel) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    return maxId;
  }
}
