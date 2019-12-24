import {Directive, HostBinding, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit {
  @HostBinding('class.open') addClass: boolean;
  constructor() { }

  ngOnInit(): void {
    this.addClass = false;
  }

  @HostListener('click') onClick(eventData: Element) {
    this.addClass = !this.addClass;
  }

  /*
  If you want that a dropdown can also be closed by a click anywhere outside
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
  */
}
