import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  // @Input() defaultColor: string;
  @Input('appHighlight') defaultColor: string;
  @Input() newColor: string;
  @HostBinding('style.color') color: string;
  constructor(private elRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'beige');
    this.color = this.defaultColor;
  }

  @HostListener('mouseenter') mouseover(eventData: Element) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'lightgreen');
    this.color = this.newColor;
  }

  @HostListener('mouseleave') mouseleave(eventData: Element) {
    this.renderer.setStyle(this.elRef.nativeElement, 'background-color', 'beige');
    this.color = this.defaultColor;
  }

}
