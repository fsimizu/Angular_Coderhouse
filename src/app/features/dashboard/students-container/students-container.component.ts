import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from '../../../shared/models/student.model';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { StudentsService } from '../../../core/services/students.service';
import { generateId } from '../../../shared/utils';

@Component({
  selector: 'app-students-container',
  templateUrl: './students-container.component.html',
  styleUrl: './students-container.component.scss'
})
export class StudentsContainerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'nationality', 'actions'];

  students: Student[] = []
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
      error: () => {
        this.isLoading = false
        console.log("error loading the students")
      },
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
          value['id'] = generateId(5)
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

  editStudent(editingStudent: Student) {
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
              error: () => {
                this.isLoading = false
                console.log("error editing the students")
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
              error: () => {
                this.isLoading = false
                console.log("error deleting the student")
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
