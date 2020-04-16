import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {RecipeModel} from './recipe.model';
import {DataStoreService} from '../shared/data-store.service';
import {Observable} from 'rxjs';
import {RecipeService} from './recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeResolverService implements Resolve<RecipeModel[]>
{
  constructor(
    private dataStoreService: DataStoreService,
    private recipeService: RecipeService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<RecipeModel[]> | Promise<RecipeModel[]> | RecipeModel[] {
    const recipes = this.recipeService.getRecipies();
    if (recipes.length === 0) {
      return this.dataStoreService.fetchRecipes();
    }
    return recipes;
  }
}
