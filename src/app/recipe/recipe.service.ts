import {RecipeModel} from './recipe.model';
import {Injectable} from '@angular/core';
import {IngredientModel} from '../shared/ingredient.model';
import {ShoppingService} from '../shopping/shopping.service';

@Injectable()
export class RecipeService {
  private recipes: RecipeModel[] = [
    new RecipeModel(
      1,
      'Fish',
      'Awesome fish',
      'https://www.eatwell.co.nz/images/recipes/22062015BiteBakedWholeFish.jpg',
      [
        new IngredientModel('Scuba', 23.45),
        new IngredientModel('Lemon', 1.18),
        new IngredientModel('Souse', 2.01),
      ]
    ),
    new RecipeModel(
      2,
      'Gamburger',
      'Big Gamburger',
      'https://media-cdn.tripadvisor.com/media/photo-s/0f/e1/fb/6f/gamburger.jpg',
      [
        new IngredientModel('Bun', 1.17),
        new IngredientModel('Cutlet', 4.50),
        new IngredientModel('Cheese', 2.00),
      ]
      ),
  ];
  constructor(private shoppingService: ShoppingService) {}
  getRecipies() {
    return this.recipes.slice();
  }
  getRecipe(id: number) {
    return this.recipes.slice().find(el => el.id === id);
  }
  addIngredientToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingService.addIngredients(ingredients);
  }
}
