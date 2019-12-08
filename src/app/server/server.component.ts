import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: 'server.component.html',
  styles: [`
    .online {color: darkblue}
  `]
})
export class ServerComponent {
  @Input() element: {type: string, id: number, name: string}
  public serverStatus: string;
  constructor() {
    this.serverStatus = Math.random() > 0.5 ? 'online' : 'offline';
  }
  getColor() {
    return this.serverStatus === 'online' ? 'lightgreen' : 'red';
  }
}

