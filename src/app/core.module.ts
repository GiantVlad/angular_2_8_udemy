import {NgModule} from '@angular/core';
import {ShoppingService} from './shopping/shopping.service';
import {RecipeService} from './recipe/recipe.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './auth/auth.interceptor';

@NgModule({
  providers: [
    ShoppingService,
    RecipeService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
})
export class CoreModule {}
