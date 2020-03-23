import {IngredientModel} from '../shared/ingredient.model';

export class RecipeModel {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: IngredientModel[];

  constructor(id: number, name: string, description: string, imagePath: string, ingredients: IngredientModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
