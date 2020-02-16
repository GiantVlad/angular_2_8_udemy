import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './user/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  activated: boolean;
  subscription: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.activated.subscribe( (val) => {
      this.activated = val;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
