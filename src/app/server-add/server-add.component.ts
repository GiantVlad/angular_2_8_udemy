import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-server-add',
  templateUrl: './server-add.component.html',
  styleUrls: ['./server-add.component.sass']
})
export class ServerAddComponent implements OnInit {
  @Output('srvAdded') serverAdded = new EventEmitter<{serverName: string, serverId: number, serverDescription: string, status: string}>();
  @ViewChild('serverIdRef', {static: true}) serverId: ElementRef;
  newServerName: string;
  public serverStatus: string;
  constructor() {
    this.newServerName = '';
  }

  ngOnInit() {
  }
  onServerAdd(desc: HTMLInputElement) {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
    this.serverAdded.emit(
      {
        serverName: this.newServerName,
        serverId: this.serverId.nativeElement.value,
        serverDescription: desc.value,
        status: this.serverStatus
      });
  }
}
