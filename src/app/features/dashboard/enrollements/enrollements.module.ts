import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollementsRoutingModule } from './enrollements-routing.module';
import { EnrollementsComponent } from './enrollements.component';


@NgModule({
  declarations: [
    EnrollementsComponent
  ],
  imports: [
    CommonModule,
    EnrollementsRoutingModule
  ],
  exports: [
    EnrollementsComponent
  ]
})
export class EnrollementsModule { }
