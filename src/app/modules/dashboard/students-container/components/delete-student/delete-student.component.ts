import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-student',
  templateUrl: './delete-student.component.html',
  styleUrl: './delete-student.component.scss'
})

export class DeleteStudentComponent {
  constructor(
    private matDialogRef: MatDialogRef<DeleteStudentComponent>,
  ) {
  }

  onSubmit(answer: boolean): void {
    this.matDialogRef.close(answer);
    // console.log(answer);
      
  }


}

