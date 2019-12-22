import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive ({
  selector: '[appStyleDirective]'
})
export class AppStyleDirective implements OnInit {
  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    this.element.nativeElement.style.backgroundColor = 'lightblue';
  }
}
