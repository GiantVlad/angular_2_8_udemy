import {NgModule} from '@angular/core';
import {RecipeListComponent} from './recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeItemComponent} from './recipe-list/recipe-item/recipe-item.component';
import {RecipeRootComponent} from './recipe-root.component';
import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RecipeRoutingModule} from './recipe-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeRootComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipeRoutingModule,
  ],
  // not needed because we have routing module
  /*exports: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeRootComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],*/
})
export class RecipeModule {}
