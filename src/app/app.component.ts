import {Component, OnInit} from '@angular/core';
import * as fromApp from './store/app.reducer'
import * as AuthActions from './auth/store/auth.action'
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  name = 'Resto';
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch( new AuthActions.AutoLogin());
  }
}
