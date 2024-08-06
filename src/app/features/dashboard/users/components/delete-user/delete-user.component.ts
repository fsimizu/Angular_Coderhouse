import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.scss'
})

export class DeleteUserComponent {
  constructor(
    private matDialogRef: MatDialogRef<DeleteUserComponent>,
  ) {}

  onSubmit(answer: boolean): void {
    this.matDialogRef.close(answer);
  }


}

