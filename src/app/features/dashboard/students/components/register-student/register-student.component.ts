import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from '../../../../../shared/models/student.model';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.scss'
})
export class RegisterStudentComponent {

  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<RegisterStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public editingStudent?: Student
  ) {
    this.studentForm = this.fb.group({
      firstName: [null, [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z _]+$')
      ]],
      lastName: [null, [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z _]+$')
      ]],
      gender: [null, Validators.required],
      nationality: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
    });

    if (this.editingStudent) {
      this.studentForm.patchValue(this.editingStudent);
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      this.matDialogRef.close(this.studentForm.value);
    } else {
      // alert('not valid')
    }
  }

  get firstNameControl() {
    return this.studentForm.get('firstName');
  }
  get lastNameControl() {
    return this.studentForm.get('lastName');
  }

}
