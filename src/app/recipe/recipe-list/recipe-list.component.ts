import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from '../recipe.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[];
  recipeChangedSubscription: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.recipeChangedSubscription = this.store.select('recipes')
      .pipe(map(recipeState => recipeState.recipes))
      .subscribe((recipes: RecipeModel[]) => {
        this.recipes = recipes;
      });
  }

  onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.recipeChangedSubscription.unsubscribe();
  }

}
