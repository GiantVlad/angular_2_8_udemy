import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-alert',
  template: `<div>
    <p>{{message}}</p>
  </div>`,
  styles: [`div {
    background: coral;
    font-family: SansSerif;
    border: 1px solid green;
    border-radius: 3px;
    padding: 10px;
    margin: 30px;
    max-width: 20%;
  }`]
})
export class AlertComponent {
  @Input() message: string;
}

