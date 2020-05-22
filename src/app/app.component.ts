import {Component, Injector} from '@angular/core';
import {createCustomElement} from "@angular/elements";
import {AlertComponent} from "./alert.component";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  content: SafeHtml = null;
  constructor(
    injector: Injector,
    domSanitizer: DomSanitizer
  ) {
    const AlertElement = createCustomElement(AlertComponent, {injector: injector});
    customElements.define('my-alert', AlertElement);
    setTimeout(() => {
      this.content = domSanitizer.bypassSecurityTrustHtml(
        '<my-alert message="Hello from web-component"></my-alert>'
      )
    }, 1000)
  }
}
