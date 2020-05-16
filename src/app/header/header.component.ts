import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as AuthActions from '../auth/store/auth.action';
import * as RecipeActions from '../recipe/store/recipe.actions';
import * as fromApp from '../store/app.reducer';
import {map} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticate = false;
  userAuthSub: Subscription;
  constructor(
    private userAuth: AuthService,
    private store: Store<fromApp.AppState>,
  ) { }

  ngOnInit(): void {
    this.userAuthSub = this.store.select('auth')
      .pipe(map(authState => authState.user))
      .subscribe(user => {
        this.isAuthenticate = !!user;
      });
  }

  onSaveData(): void {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }
  onFetchData(): void {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  logout(): void {
    this.store.dispatch( new AuthActions.Logout());
  }

  ngOnDestroy(): void {
    if (this.userAuthSub) {
      this.userAuthSub.unsubscribe();
    }
  }
}
