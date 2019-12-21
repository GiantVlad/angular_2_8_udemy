export class RecipeModel {
  public name: string;
  public description: string;
  public imagePath: string;
  constructor(name: string, description: string, imagePuth: string) {
    this.name = name;
    this.description = description;
    this.imagePath = imagePuth;
  }
}
