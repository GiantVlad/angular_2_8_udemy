import { Component, OnInit } from '@angular/core';
import {RecipeModel} from './recipe.model';

@Component({
  selector: 'app-recipe-root',
  templateUrl: './recipe-root.component.html',
  styleUrls: ['./recipe-root.component.scss']
})
export class RecipeRootComponent implements OnInit {
  selectedRecipe: RecipeModel;

  constructor() { }

  ngOnInit() {
  }

}
