import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  odd: [number];
  even: [number];
  constructor() {
    this.odd = [0];
    this.even = [0];
  }
  onCounter(random: {counter: number}) {
    if (random.counter === 0 || !!(random.counter && !(random.counter % 2))) {
      this.even.push(random.counter);
    } else {
      this.odd.push(random.counter);
    }
  }
}
