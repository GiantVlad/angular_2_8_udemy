import { Component, OnInit } from '@angular/core';
import {UserStatusService} from './user-status.service';
import {CountStatusService} from './count-status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activeUsers = [];
  inactiveUsers = [];
  countActive = 0;
  countInactive = 0;
  constructor(private userStatusService: UserStatusService, private countStatusService: CountStatusService) {
    this.countStatusService.countToActive.subscribe((count: number) => this.countActive = count);
    this.countStatusService.countToInactive.subscribe((count: number) => this.countInactive = count);
  }
  ngOnInit() {
    this.activeUsers = this.userStatusService.activeUsers;
    this.inactiveUsers = this.userStatusService.inactiveUsers;
  }
}
