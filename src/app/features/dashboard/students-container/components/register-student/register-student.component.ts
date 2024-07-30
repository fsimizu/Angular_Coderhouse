import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../shared/models/users';

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
    @Inject(MAT_DIALOG_DATA) public editingStudent?: User
  ) {
    this.studentForm = this.fb.group({
      firstName: [null, [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      lastName: [null, [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z]+$')
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
      // alert("all good!")
    } else {
      /// mostar error
    }
  }

  get firstNameControl() {
    return this.studentForm.get('firstName');
  }
  get lastNameControl() {
    return this.studentForm.get('lastName');
  }

}
