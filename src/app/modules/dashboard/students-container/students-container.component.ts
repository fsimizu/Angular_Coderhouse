import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/users';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';


function generateId(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}


@Component({
  selector: 'app-students-container',
  templateUrl: './students-container.component.html',
  styleUrl: './students-container.component.scss'
})
export class StudentsContainerComponent {
  displayedColumns: string[] = ['id', 'fullName', 'nationality', 'actions'];

  dataSource: User[] = [
    {
      id: "h45fj",
      firstName: "Fernando",
      lastName: "Chapa",
      gender: 'male',
      nationality: 'Argentina',
      dateOfBirth: new Date('10/02/1999')
    },
    {
      id: "4h65z",
      firstName: "Lucas",
      lastName: "Rodriguez",
      gender: 'male',
      nationality: 'Mexico',
      dateOfBirth: new Date('10/02/1999')
    },
    {
      id: "dfkka",
      firstName: "Sofia",
      lastName: "Gomez",
      gender: 'female',
      nationality: 'Uruguay',
      dateOfBirth: new Date('10/02/1999')
    }
  ];

  constructor(private matDialog: MatDialog) { }

  openDialog(): void {
    this.matDialog
      .open(RegisterStudentComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          value['id'] = generateId(5);
          this.dataSource = [...this.dataSource, value];
        },
      });
  }

  editStudent(editingStudent: User) {
    this.matDialog
      .open(RegisterStudentComponent, { data: editingStudent })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.dataSource = this.dataSource.map((el) =>
              el.id === editingStudent.id
                ? { ...value, id: editingStudent.id }
                : el
            );
          }
        },
      });
  }

  deleteStudentById(id: string) {
    this.matDialog
      .open(DeleteStudentComponent)
      .afterClosed()
      .subscribe({
        next: (answer) => {
          if (answer) {
            this.dataSource = this.dataSource.filter((el) => el.id != id);
          }
        },
      });

  }

}
