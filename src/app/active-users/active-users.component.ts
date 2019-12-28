import {Component, Input, OnInit} from '@angular/core';
import {UserStatusService} from '../user-status.service';
import {CountStatusService} from '../count-status.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent implements OnInit {
  users: string[];
  countActions = 0;
  constructor(private userStatusService: UserStatusService, private countStatusService: CountStatusService) {
  }
  ngOnInit(): void {
    this.users = this.userStatusService.activeUsers;
  }

  onSetToInactive(id: number) {
    this.userStatusService.onSetToInactive(id);
    this.countStatusService.countToInactive.emit(++this.countActions);
  }
}
