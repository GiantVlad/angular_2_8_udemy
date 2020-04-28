import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStoreService} from '../shared/data-store.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

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
    private userAuth: AuthService
  ) { }

  ngOnInit(): void {
    this.userAuthSub = this.userAuth.user.subscribe(user => {
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
    this.userAuth.logout();
  }

  ngOnDestroy(): void {
    if (this.userAuthSub) {
      this.userAuthSub.unsubscribe();
    }
  }
}
