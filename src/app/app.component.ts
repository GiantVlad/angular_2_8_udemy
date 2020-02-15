import { Component } from '@angular/core';
import {IngredientModel} from './shared/ingredient.model';
import {ShoppingService} from './shopping/shopping.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Resto';
  constructor() { }
}
