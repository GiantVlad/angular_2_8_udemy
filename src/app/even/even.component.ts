import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.sass']
})
export class EvenComponent implements OnInit {
  @Input() rnd: number;
  constructor() { }

  ngOnInit() {
  }

}
