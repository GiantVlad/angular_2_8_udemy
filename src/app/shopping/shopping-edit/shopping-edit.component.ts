import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: true}) editItemForm: NgForm;
  editMode = false;
  private subscriptions: Subscription[];
  constructor(private shoppingService: ShoppingService) {
    this.subscriptions = [];
  }

  ngOnInit() {
    const sub = this.shoppingService.ingredientSelected.subscribe((selectedItem) => {
      if (selectedItem !== null) {
        this.editMode = true;
        this.editItemForm.setValue({itemName: selectedItem.name, amount: selectedItem.amount});
      }
    });
    this.subscriptions.push(sub);
  }

  onSubmit(): void {
    if (this.editItemForm.touched && this.editItemForm.invalid) {
      return;
    }
    const ingredient = new IngredientModel(
      this.editItemForm.value.itemName,
      this.editItemForm.value.amount);

    if (this.editMode) {
      this.shoppingService.changeIngredient(ingredient);
    } else {
      this.shoppingService.addIngredient(ingredient);
    }
    this.onReset();
  }

  onDelete(): void {
    this.shoppingService.deleteSelected();
    this.onReset();
  }
  onReset(): void {
    this.editItemForm.reset();
    this.shoppingService.unselectedAll();
    this.editMode = false;
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      sub.unsubscribe();
    });
  }
}
