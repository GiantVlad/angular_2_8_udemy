import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  name = 'Timaty';
  testHooks: [{name: string}, {name: string}];
  constructor() {
    this.testHooks = [{name: 'First'}, {name: 'Second'}];
  }

  destroyItem() {
    this.testHooks.splice(0, 1);
  }

  addItem() {
    this.testHooks.push({name: this.randStr()});
  }
  changeFirstItem() {
     this.testHooks[0].name = this.randStr();
  }
  private randStr(): string {
    return Math.random().toString(36).substr(2, 5);
  }
}
