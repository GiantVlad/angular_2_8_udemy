import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.sass']
})
export class GameControlComponent implements OnInit {
  @Output('counter') counter = new EventEmitter<{counter: number}>();
  interval: number;
  constructor() {
    this.counter.emit({counter: 0});
  }

  ngOnInit() {}

  startGame() {
    this.interval = setInterval(() => {
      this.counter.emit( {counter: Math.floor(Math.random() * 9) + 1});
    }, 1000);
  }

  stopGame() {
    clearInterval(this.interval);
    this.interval = undefined;
  }

}
