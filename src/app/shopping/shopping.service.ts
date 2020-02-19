import {IngredientModel} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingService {
  ingredientsChanged = new Subject<IngredientModel[]>();
  private ingredients: IngredientModel[] = [
    new IngredientModel('Scumbria', 23.45),
    new IngredientModel('Apple', 2.00),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: IngredientModel) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: IngredientModel[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
