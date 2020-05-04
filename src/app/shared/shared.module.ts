import {NgModule} from '@angular/core';
import {LoadingComponent} from './loading/loading.component';
import {AlertComponent} from './alert/alert.component';
import {PlaceholderDirective} from './placeholder/placeholder.directive';
import {CommonModule} from '@angular/common';
import {DropdownDirective} from './dropdown.directive';

@NgModule({
  declarations: [
    LoadingComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoadingComponent,
    AlertComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
