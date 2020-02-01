import { Component, OnInit } from '@angular/core';
import {RecipeModel} from './recipe.model';
import {RecipeService} from './recipe.service';

@Component({
  selector: 'app-recipe-root',
  templateUrl: './recipe-root.component.html',
  styleUrls: ['./recipe-root.component.scss'],
  providers: [RecipeService],
})
export class RecipeRootComponent implements OnInit {
  selectedRecipe: RecipeModel;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.recipeSelected.subscribe(
      (recipe: RecipeModel) => {
        this.selectedRecipe = recipe;
      }
    );
  }

}
