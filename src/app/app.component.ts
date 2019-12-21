import { Component } from '@angular/core';
import {IngredientModel} from './shared/ingredient.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  selectedRoute = 'recipes';
  name = 'Resto';
  ingredients: IngredientModel[] = [new IngredientModel('Scumbria', 23.45)];
  onSelectRoute(eventVal) {
    this.selectedRoute = eventVal;
  }

  addIngredient(ingredient) {
    this.ingredients.push(ingredient);
  }
}
