import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStoreService} from '../shared/data-store.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';
import {Store} from "@ngrx/store";
import * as AuthActions from '../auth/store/auth.action'
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
    private dataStoreService: DataStoreService,
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
    this.dataStoreService.updateRecipes();
  }
  onFetchData(): void {
    this.dataStoreService.fetchRecipes().subscribe();
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
