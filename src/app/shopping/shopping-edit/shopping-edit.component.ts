import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';
import {ShoppingService} from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputElementAmount', {static: true}) inputElementAmount: ElementRef;
  @ViewChild('inputElementName', {static: true}) inputElementName: ElementRef;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
  }

  onAdd() {
    this.shoppingService.addIngredient(
      new IngredientModel(
        this.inputElementName.nativeElement.value,
        this.inputElementAmount.nativeElement.value)
    );
  }
}
