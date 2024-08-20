import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../../../../shared/models/course.model';

@Component({
  selector: 'app-register-course',
  templateUrl: './register-course.component.html',
  styleUrl: './register-course.component.scss'
})
export class RegisterCourseComponent {

  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<RegisterCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public editingCourse?: Course
  ) {
    this.courseForm = this.fb.group({
      courseName: [null, [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z0-9 _]+$')
      ]],
      courseDescription: [null, [
        Validators.required, 
        Validators.minLength(3)
      ]]
    });

    if (this.editingCourse) {
      this.courseForm.patchValue(this.editingCourse);
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      this.matDialogRef.close(this.courseForm.value);
    } else {
      alert('not valid')
    }
  }

  get courseNameControl() {
    return this.courseForm.get('courseName');
  }
  get courseDescriptionControl() {
    return this.courseForm.get('courseDescription');
  }

}
