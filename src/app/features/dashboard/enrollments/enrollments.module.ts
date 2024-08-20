import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../../shared/shared.module';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { EnrollmentsComponent } from './enrollments.component';
import { EnrollmentsEffects } from './store/enrollments.effects';
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
