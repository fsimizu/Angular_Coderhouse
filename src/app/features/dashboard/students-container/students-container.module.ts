import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentsContainerComponent } from './students-container.component';
import { StudentsContainerRoutingModule } from './students-container-routing.module';

@NgModule({
  declarations: [
    StudentsContainerComponent, 
    RegisterStudentComponent,
    DeleteStudentComponent,
    StudentDetailsComponent
  ],
  exports: [
    StudentsContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsContainerRoutingModule
  ],
})
export class StudentsContainerModule { }
