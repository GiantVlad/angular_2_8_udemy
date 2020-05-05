import {Component, OnInit} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';
import {Observable, Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppingActions from "../store/shopping.action";
import * as fromShopping from "../store/shopping.reducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ ingredients: IngredientModel[] }>;

  constructor(
    private store: Store<fromShopping.AppState>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList')
  }
  onSelect(i: number): void {
    this.store.dispatch( new ShoppingActions.StartEditing(i) );
  }
}
