import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unenroll-course',
  templateUrl: './unenroll-course.component.html',
  styleUrl: './unenroll-course.component.scss'
})
export class UnenrollCourseComponent {
  constructor(
    private matDialogRef: MatDialogRef<UnenrollCourseComponent>,
  ) {}

  onSubmit(answer: boolean): void {
    this.matDialogRef.close(answer);
  }


}
