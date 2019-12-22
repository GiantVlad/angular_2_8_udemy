import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppStyleDirective} from './share/app-style.directive';
import { HighlightDirective } from './share/highlight.directive';
import { UnlessDirective } from './share/unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    AppStyleDirective,
    HighlightDirective,
    UnlessDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
