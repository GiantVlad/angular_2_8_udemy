import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[];
  recipeChangedSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeChangedSubscription = this.recipeService.recipeChanged.subscribe((recipes: RecipeModel[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipies();
  }

  onCreate() {
    this.router.navigate(['create'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.recipeChangedSubscription.unsubscribe();
  }

}
