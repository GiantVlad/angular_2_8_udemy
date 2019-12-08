export class RecipeModel {
  public name: string;
  public description: string;
  public imagePuth: string;
  constructor(name: string, description: string, imagePuth: string) {
    this.name = name;
    this.description = description;
    this.imagePuth = imagePuth;
  }
}
