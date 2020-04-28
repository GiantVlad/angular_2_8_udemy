import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipe/recipe.service';
import {RecipeModel} from '../recipe/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})

export class DataStoreService {
  readonly FIREBASE_URL = 'https://ng-recipe-book-bcff0.firebaseio.com/recipes.json';
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
  ) {
  }

  updateRecipes() {
    const recipes = this.recipeService.getRecipies();
    this.http
      .put(this.FIREBASE_URL, recipes)
      .subscribe(
      response => {
          console.log(response);
        },
        error => {
          console.log(error);
        }
      );
  }

  fetchRecipes(): Observable<RecipeModel[]> {
    return this.http.get<RecipeModel[]>(this.FIREBASE_URL).pipe(
      map(response => {
        return response.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap(response => {
        this.recipeService.setRecipies(response);
      })
    );
  }
}
