import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../../../shared/shared.module';
import { CoursesComponent } from './courses.component';
import { CourseDetailsComponent } from './pages/course-details/course-details.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { DeleteCourseComponent } from './components/delete-course/delete-course.component';
import { RegisterCourseComponent } from './components/register-course/register-course.component';


@NgModule({
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    DeleteCourseComponent,
    RegisterCourseComponent
  ],
  exports: [
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
  
  ],
})
export class CoursesModule { }