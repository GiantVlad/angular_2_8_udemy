import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {RecipeModel} from './recipe.model';
import {Observable, of} from 'rxjs';
import * as fromApp from '../store/app.reducer';
import {Store} from "@ngrx/store";
import * as RecipeActions from '../recipe/store/recipe.actions';
import {Actions, ofType} from '@ngrx/effects';
import {map, switchMap, take} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<RecipeModel[]>
{
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions,
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
    return this.store.select('recipes')
      .pipe(
        take(1),
        map(recipeState => recipeState.recipes),
        switchMap(recipes => {
          if (recipes.length === 0) {
            this.store.dispatch(new RecipeActions.FetchRecipes());

            return this.actions$.pipe(
              ofType(RecipeActions.SET_RECIPES),
              take(1)
            )
          } else {
            return of(recipes);
          }
        })
      );
  }
}
