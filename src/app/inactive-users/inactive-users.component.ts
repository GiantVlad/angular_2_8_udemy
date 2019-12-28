import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {UserStatusService} from '../user-status.service';
import {CountStatusService} from '../count-status.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent implements OnInit {
  users: string[];
  countActions = 0;
  constructor(private userStatusService: UserStatusService, private countStatusService: CountStatusService) {}
  ngOnInit(): void {
    this.users = this.userStatusService.inactiveUsers;
  }
  onSetToActive(id: number) {
    this.userStatusService.onSetToActive(id);
    this.countStatusService.countToActive.emit(++this.countActions);
  }
}
