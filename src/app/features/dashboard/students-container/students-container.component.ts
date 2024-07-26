import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../../../models/users';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { StudentsService } from '../../../core/services/students.service';


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
export class StudentsContainerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'nationality', 'actions'];

  students: User[] = []
  isLoading = false

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService
  ) { }

  ngOnInit(): void {
    this.getStudents()
  }

  getStudents() {
    this.isLoading = true;
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students
      },
      error: () => {}, //Aca habria que mostrar  algun error
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  openDialog(): void {
    this.matDialog
      .open(RegisterStudentComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          value['id'] = generateId(5);
          this.isLoading = true;
          this.studentsService.addStudent(value).subscribe({
            next: (students) => {
              this.students = [...students];
            },
            complete: () => {
              this.isLoading = false
            }
          })
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
            this.isLoading = true;
            this.studentsService.editStudent(editingStudent.id, value).subscribe({
              next: (students) => {
                this.students = [...students];
              },
              complete: () => {
                this.isLoading = false
              }
            })
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
            this.isLoading = true;
            this.studentsService.deleteStudentById(id).subscribe({
              next: (students) => {
                this.students = [...students];
              },
              complete: () => {
                this.isLoading = false
              }
            })
          }
        },
      });

  }

}
