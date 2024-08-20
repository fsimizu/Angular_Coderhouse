import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { DeleteCourseComponent } from './components/delete-course/delete-course.component';
import { RegisterCourseComponent } from './components/register-course/register-course.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CoursesEffects } from './store/courses.effects';
import { CoursesFeature } from './store/courses.reducer';
import { UnenrollCourseComponent } from './components/unenroll-course/unenroll-course.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    DeleteCourseComponent,
    RegisterCourseComponent,
    UnenrollCourseComponent
  ],
  exports: [
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
    EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature(CoursesFeature),
  ],
})
export class CoursesModule { }