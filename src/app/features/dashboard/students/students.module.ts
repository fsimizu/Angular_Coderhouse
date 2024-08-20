import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../../../shared/shared.module';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';
import { StudentsEffects } from './store/students.effects';
import { StudentsFeature } from './store/students.reducer';
import { StudentsRoutingModule } from './students-routing.module';
import { StudentsComponent } from './students.component';
import { UnenrollStudentComponent } from './components/unenroll-student/unenroll-student.component';

@NgModule({
  declarations: [
    StudentsComponent, 
    RegisterStudentComponent,
    DeleteStudentComponent,
    UnenrollStudentComponent,
    StudentDetailsComponent,
    
  ],
  exports: [
    StudentsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StudentsRoutingModule,
    EffectsModule.forFeature([StudentsEffects]),
    StoreModule.forFeature(StudentsFeature),
  ],
})
export class StudentsModule { }
