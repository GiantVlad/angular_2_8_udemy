import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  isEdit = false;
  paramsSubscription: Subscription;
  constructor(private route: ActivatedRoute ) {
    this.isEdit = route.snapshot.params.hasOwnProperty('id');
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.isEdit = params.hasOwnProperty('id');
      }
    );
  }
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
