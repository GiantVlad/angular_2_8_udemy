import {Component, OnInit, OnDestroy} from '@angular/core';
import {RecipeModel} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: RecipeModel;
  paramsSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              ) {
    this.recipe = this.recipeService.getRecipe(+this.route.snapshot.params.id);
  }

  onAddToShoppingList(): void {
   this.recipeService.addIngredientToShoppingList(this.recipe.ingredients);
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipe(+params.id);
      }
    );
  }

  onDeleteRecipe(): Promise<boolean> {
    this.recipeService.delete(+this.recipe.id);
    return this.router.navigate(['recipes']);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
