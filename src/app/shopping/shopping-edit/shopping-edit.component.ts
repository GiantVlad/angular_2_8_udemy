import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as ShoppingActions from '../store/shopping.action'
import * as fromShopping from "../store/shopping.reducer";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: true}) editItemForm: NgForm;
  editMode = false;

  private subscriptions: Subscription[];

  constructor(
    private store: Store<fromShopping.AppState>
  ) {
    this.subscriptions = [];
  }

  ngOnInit() {
    const selectedIngrSub = this.store.select('shoppingList').subscribe(store => {
      const selectedIngredient = store.ingredients.find(ingredient => ingredient.selected);
      if (selectedIngredient !== undefined) {
        this.editMode = true;
        this.editItemForm.setValue({itemName: selectedIngredient.name, amount: selectedIngredient.amount});
      }
    })

    this.subscriptions.push(selectedIngrSub);
  }

  onSubmit(): void {
    if (this.editItemForm.touched && this.editItemForm.invalid) {
      return;
    }
    const ingredient = new IngredientModel(
      this.editItemForm.value.itemName,
      this.editItemForm.value.amount
    );

    if (this.editMode) {
      this.store.dispatch( new ShoppingActions.UpdateIngredient(ingredient) )
    } else {
      this.store.dispatch( new ShoppingActions.AddIngredient(ingredient) )
    }
    this.onReset();
  }

  onDelete(): void {
    this.store.dispatch( new ShoppingActions.DeleteIngredient() )
    this.onReset();
  }

  onReset(): void {
    this.editItemForm.reset();
    this.editMode = false;
    this.store.dispatch( new ShoppingActions.StopEditing())
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
