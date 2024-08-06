import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { StudentsService } from '../../../core/services/students.service';
import { Student } from '../../../shared/models/student.model';
import { User } from '../../../shared/models/users';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';

@Component({
  selector: 'app-students-container',
  templateUrl: './students-container.component.html',
  styleUrl: './students-container.component.scss'
})
export class StudentsContainerComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'nationality', 'actions'];
  
  students: Student[] = []
  isLoading = false

  authUser$: Observable<User | null>;
  
  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsService,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.authUser$;
  }

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
          if (!!value){
          this.isLoading = true;
          this.studentsService
          .addStudent(value)
          .pipe(tap(()=> {
            this.getStudents();
            this.isLoading = false
          }))
          .subscribe()
        }
      }
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
            this.studentsService
            .editStudent(editingStudent.id, value)
              .subscribe({
              next: () => {
                this.getStudents();
              },
              error: (error) => {
                if (error instanceof HttpErrorResponse) {
                  alert('error editing the student');
                  this.isLoading = false   
                  if (error.status === 404) {
                    console.log('error editing the student'); 
                  }
                }
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

            this.studentsService
            .deleteStudentById(id)
            .subscribe({
              next: () => {
                this.getStudents();
              },
              error: (error) => {
                if (error instanceof HttpErrorResponse) {
                  alert('error deleting the student');
                  this.isLoading = false    
                  if (error.status === 404) {
                    alert('error 404');
                  }
                }
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
