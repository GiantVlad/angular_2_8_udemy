import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.sass']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  serverCreationStatus: string = 'Server was not created!';
  serverName: string = 'My Name';
  serverDescription: string = '';
  constructor() {
    setTimeout(() => { this.allowNewServer = true; }, 2000);
  }

  ngOnInit() {
  }
  onChangeStatus() {
    this.serverCreationStatus = 'Server was created! Server Name is ' + this.serverName;
  }
  onChangeName(e: Event) {
    this.serverName = (<HTMLInputElement> e.target).value;
  }

}
