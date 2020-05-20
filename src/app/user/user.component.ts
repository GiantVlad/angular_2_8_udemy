import { Component, OnInit } from '@angular/core';
import {UserService} from "./user.service";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass'],
  providers: [UserService]
})
export class UserComponent implements OnInit {
  user: { name: string };
  data: { data: string };
  isLoggedIn = false;
  constructor(
    private userService: UserService,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.dataService.getData().then(data => this.data = data);
  }

}
