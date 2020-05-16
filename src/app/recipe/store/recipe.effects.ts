import * as RecipeActions from './recipe.actions';
import {Actions, Effect, ofType} from "@ngrx/effects";
import {map, switchMap, withLatestFrom} from "rxjs/operators";
import {RecipeModel} from "../recipe.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  readonly FIREBASE_URL = 'https://ng-recipe-book-bcff0.firebaseio.com/recipes.json';

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<RecipeModel[]>(this.FIREBASE_URL);
    }),
    map(recipes => {
      if (recipes) {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }
      return recipes;
    }),
    map(recipes => new RecipeActions.SetRecipes(recipes))
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipeActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(this.FIREBASE_URL, recipesState.recipes);
    }),
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
  ) {}
}
