import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, FormArray, Validators} from '@angular/forms';
import * as fromApp from '../../store/app.reducer';
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import {RecipeModel} from "../recipe.model";
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  isEdit = false;
  paramsSubscription: Subscription;
  recipeForm: FormGroup;
  recipeId: number;
  recipeSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {
    this.isEdit = route.snapshot.params.hasOwnProperty('id');
    this.recipeId = this.isEdit ? +route.snapshot.params.id : null;
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.isEdit = params.hasOwnProperty('id');
        this.recipeId = this.isEdit ? +params.id : null;
        this.initForm();
      }
    );
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onSubmit(): Promise<boolean> {
    if (this.isEdit) {
      this.store.dispatch(new RecipeActions.UpdateRecipe(
        {
          id: +this.recipeId,
          newRecipe: this.recipeForm.value
        }));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    return this.redirectBack();
  }

  initForm() {
    let id = null;
    let name = null;
    let description = null;
    let img = null;
    const recepiIngredients = new FormArray([]);
    if (this.isEdit) {
      this.recipeSubscription = this.store.select('recipes')
        .pipe(
          map(recipesState => {
            return recipesState.recipes.find((recipe: RecipeModel) => recipe.id === +this.recipeId);
          })
        )
        .subscribe((recipe: RecipeModel) => {
          id = +this.recipeId;
          name = recipe.name;
          description = recipe.description;
          img = recipe.imagePath;
          if (recipe.ingredients !== undefined) {
            for (const ingredient of recipe.ingredients) {
              recepiIngredients.push( new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
              }));
            }
          }
        });
    }
    this.recipeForm = new FormGroup({
      id: new FormControl(id),
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      imagePath: new FormControl(img, Validators.required),
      ingredients: recepiIngredients,
    });
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      })
    );
  }

  redirectBack(): Promise<boolean> {
    const to = this.isEdit ? ['../../', this.recipeId] : ['../'];
    return this.router.navigate(to, {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
  }
}
