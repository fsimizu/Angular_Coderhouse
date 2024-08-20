import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { SharedModule } from '../../../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { EnrollmentsEffects } from './store/enrollments.effects';
import { StoreModule } from '@ngrx/store';
import { enrollmentsFeature } from './store/enrollments.reducer';


@NgModule({
  declarations: [
    EnrollmentsComponent
  ],
  imports: [
    CommonModule,
    EnrollmentsRoutingModule,
    SharedModule,
    StoreModule.forFeature(enrollmentsFeature),
    EffectsModule.forFeature([EnrollmentsEffects])
  ],
  exports: [
    EnrollmentsComponent
  ]
})
export class EnrollmentsModule {}
