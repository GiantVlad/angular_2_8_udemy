import {RecipeModel} from './recipe.model';
import {Injectable} from '@angular/core';
import {IngredientModel} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping/shopping.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  // private recipes: RecipeModel[] = [
  //   new RecipeModel(
  //     1,
  //     'Fish',
  //     'Awesome fish',
  //     'https://www.eatwell.co.nz/images/recipes/22062015BiteBakedWholeFish.jpg',
  //     [
  //       new IngredientModel('Scuba', 5),
  //       new IngredientModel('Lemon', 1),
  //       new IngredientModel('Souse', 2),
  //     ]
  //   ),
  //   new RecipeModel(
  //     2,
  //     'Gamburger',
  //     'Big Gamburger',
  //     'https://media-cdn.tripadvisor.com/media/photo-s/0f/e1/fb/6f/gamburger.jpg',
  //     [
  //       new IngredientModel('Bun', 3),
  //       new IngredientModel('Cutlet', 4),
  //       new IngredientModel('Cheese', 2),
  //     ]
  //     ),
  // ];
  private recipes: RecipeModel[] = [];
  recipeChanged = new Subject<RecipeModel[]>();
  constructor(private shoppingService: ShoppingService) {}

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
    this.shoppingService.addIngredients(ingredients);
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
