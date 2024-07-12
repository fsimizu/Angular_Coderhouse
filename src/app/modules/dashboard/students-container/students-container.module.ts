import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { StudentsContainerComponent } from './students-container.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../../../shared/shared.module';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';

@NgModule({
  declarations: [
    StudentsContainerComponent, RegisterStudentComponent, DeleteStudentComponent
  ],
  exports: [
    StudentsContainerComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    SharedModule

  ],
})
export class StudentsContainerModule { }
