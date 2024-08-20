import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unenroll-student',
  templateUrl: './unenroll-student.component.html',
  styleUrl: './unenroll-student.component.scss'
})

export class UnenrollStudentComponent {
  constructor(
    private matDialogRef: MatDialogRef<UnenrollStudentComponent>,
  ) {}

  onSubmit(answer: boolean): void {
    this.matDialogRef.close(answer);
  }
}

