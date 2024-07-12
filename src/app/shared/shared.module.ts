import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipes/full-name.pipe';
import { HeadersDirective } from './directives/headers.directive';



@NgModule({
  declarations: [
    FullNamePipe,
    HeadersDirective
  ],
  exports: [
    FullNamePipe,
    HeadersDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
