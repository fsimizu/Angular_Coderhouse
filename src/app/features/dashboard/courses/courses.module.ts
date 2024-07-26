import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent
  ],
  exports: [
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  
  ],
})
export class CoursesModule { }