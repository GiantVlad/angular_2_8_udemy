import {IngredientModel} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingService {
  ingredientsChanged = new Subject<IngredientModel[]>();
  ingredientSelected = new Subject<IngredientModel>();
  private ingredients: IngredientModel[] = [
    new IngredientModel('Scumbria', 8),
    new IngredientModel('Apple', 2),
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
  changeIngredient(ingredient: IngredientModel) {
    this.ingredients.forEach((item: IngredientModel, idx: number) => {
      if (item.selected) {
        this.ingredients[idx] = ingredient;
      }
    });
    // this.unselectedAll();
  }
  selectIngredient(i: number): void {
    this.ingredients.map((ingredient: IngredientModel) => ingredient.selected = false);
    this.ingredients[i].selected = true;
    this.ingredientsChanged.next(this.ingredients);
    this.emitSelected();
  }
  deleteSelected(): void {
    this.ingredients = this.ingredients.filter((ingredient: IngredientModel) => ingredient.selected === false);
    this.ingredientsChanged.next(this.ingredients);
  }
  unselectedAll(): void {
    this.ingredients.map((ingredient: IngredientModel) => ingredient.selected = false);
    this.ingredientsChanged.next(this.ingredients);
    this.emitSelected();
  }
  emitSelected(): void {
    this.ingredientSelected.next(
      this.ingredients.find(
        (ingredient: IngredientModel) => ingredient.selected
      ) || null
    );
  }
}
