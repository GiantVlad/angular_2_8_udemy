import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShoppingListComponent} from './shopping/shopping-list/shopping-list.component';
import {RecipeRootComponent} from './recipe/recipe-root.component';
import {RecipeDetailComponent} from './recipe/recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './recipe/recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe/recipe-edit/recipe-edit.component';
import {RecipeResolverService} from './recipe/recipe-resolver.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes',
    component: RecipeRootComponent ,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'create', component: RecipeEditComponent },
      { path: 'edit/:id', component: RecipeEditComponent, resolve: [RecipeResolverService] },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
