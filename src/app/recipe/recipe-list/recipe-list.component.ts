import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {RecipeModel} from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: RecipeModel[] = [
    new RecipeModel('Fish', 'Awesome fish', 'https://www.eatwell.co.nz/images/recipes/22062015BiteBakedWholeFish.jpg'),
    new RecipeModel('Fish2', 'Awesome fish2', 'https://www.eatwell.co.nz/images/recipes/22062015BiteBakedWholeFish.jpg'),
  ];
  @Output() recipeDetail: EventEmitter<RecipeModel> = new EventEmitter<RecipeModel>();
  constructor() { }

  ngOnInit() {
  }

}
