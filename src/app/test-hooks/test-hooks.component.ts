import {
  Component,
  OnInit,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  Input,
  ViewChild,
  ElementRef, ContentChild,
} from '@angular/core';

@Component({
  selector: 'app-test-hooks',
  templateUrl: './test-hooks.component.html',
  styleUrls: ['./test-hooks.component.sass']
})

export class TestHooksComponent implements OnInit, OnDestroy, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Input() name: string;
  @ViewChild('heading', {static: true}) header: ElementRef;
  @ContentChild('paragraphElement', {static: true}) paragraph: ElementRef;
  constructor() {
    console.log('Constructor');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ON Changes');
    console.log(changes);
  }

  ngOnInit(): void  {
    console.log('ON INIT');
    console.log('No Text content: ' + this.header.nativeElement.textContent);
  }

  ngOnDestroy(): void  {
    console.log('ON Destroy');
  }

  ngDoCheck(): void  {
    console.log('ON DoCheck');
  }

  ngAfterContentChecked(): void {
    console.log('Content Checked');
  }

  ngAfterContentInit(): void {
    console.log('Content Init');
    console.log('Text content of paragraph: ' + this.paragraph.nativeElement.textContent);
  }

  ngAfterViewChecked(): void {
    console.log('View Checked');
  }

  ngAfterViewInit(): void {
    console.log('View Init');
    console.log('Text content: ' + this.header.nativeElement.textContent);
  }

}
