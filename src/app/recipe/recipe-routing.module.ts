import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeRootComponent} from './recipe-root.component';
import {AuthGuard} from '../auth/auth.guard';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeResolverService} from './recipe-resolver.service';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';

const routes: Routes = [
  { path: '',
    component: RecipeRootComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'create', component: RecipeEditComponent },
      { path: 'edit/:id', component: RecipeEditComponent, resolve: [RecipeResolverService] },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {}
