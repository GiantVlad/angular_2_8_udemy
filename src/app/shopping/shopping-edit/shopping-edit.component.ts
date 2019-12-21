import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IngredientModel} from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('inputElementAmount', {static: true}) inputElementAmount: ElementRef;
  @ViewChild('inputElementName', {static: true}) inputElementName: ElementRef;
  @Output() newIngredient: EventEmitter<IngredientModel> = new EventEmitter<IngredientModel>();
  constructor() { }

  ngOnInit() {
  }

  onAdd() {
    this.newIngredient.emit(new IngredientModel(this.inputElementName.nativeElement.value, this.inputElementAmount.nativeElement.value));
  }

}
