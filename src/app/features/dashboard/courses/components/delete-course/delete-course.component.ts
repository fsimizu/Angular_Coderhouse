import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.scss'
})
export class DeleteCourseComponent {
  constructor(
    private matDialogRef: MatDialogRef<DeleteCourseComponent>,
  ) {}

  onSubmit(answer: boolean): void {
    this.matDialogRef.close(answer);
  }


}
