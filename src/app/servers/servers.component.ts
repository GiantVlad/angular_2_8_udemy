import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.sass']
})
export class ServersComponent implements OnInit {
  servers = [{description: 'First server', id: 12, name: 'First Name'}];
  serverStatus = 'online';
  getColor() {
    return this.serverStatus === 'online' ? 'lightgreen' : 'red';
  }

  ngOnInit() {
  }

  onServerAdded(serverData: {serverName: string, serverId: number, serverDescription: string, status: string}) {
    this.serverStatus = serverData.status;
    this.servers.push(
      {description: serverData.serverDescription, id: serverData.serverId, name: serverData.serverName}
    );
  }
}
