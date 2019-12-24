import {Component, Input, OnInit} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  @Input() ingredients: IngredientModel[];

  constructor() { }

  ngOnInit() {
  }

}