import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  @Input() ingredients: IngredientModel[];
  private shoppingSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingSubscription = this.shoppingService.ingredientsChanged.subscribe(
      ingredients => {
        this.ingredients = ingredients;
      }
    );
  }
  ngOnDestroy(): void {
    this.shoppingSubscription.unsubscribe();
  }
}
