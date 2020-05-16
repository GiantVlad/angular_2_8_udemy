import {Component, OnInit, OnDestroy} from '@angular/core';
import {RecipeModel} from '../recipe.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import {map, switchMap} from "rxjs/operators";
import  * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping/store/shopping.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: RecipeModel;
  paramsSubscription: Subscription;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  onAddToShoppingList(): void {
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params
      .pipe(
        map(params => {
          return +params.id;
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((r, index: number) => r.id === this.id);
        })
      )
      .subscribe(
      (recipe: RecipeModel) => {
        this.recipe = recipe;
      }
    );
  }

  onDeleteRecipe(): Promise<boolean> {
    this.store.dispatch(new RecipeActions.DeleteRecipe({ id: +this.recipe.id }))
    return this.router.navigate(['recipes']);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
