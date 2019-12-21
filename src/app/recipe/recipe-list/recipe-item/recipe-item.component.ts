import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {RecipeModel} from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: RecipeModel;
  @Output() recipeDetail: EventEmitter<RecipeModel> = new EventEmitter<RecipeModel>();
  constructor() { }

  ngOnInit() {
  }

  onClickRecipe() {
    this.recipeDetail.emit(this.recipe);
  }

}
