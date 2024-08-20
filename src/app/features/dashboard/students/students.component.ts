import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../core/store';
import { selectAuthUser } from '../../../core/store/auth/auth.selectors';
import { Student } from '../../../shared/models/student.model';
import { User } from '../../../shared/models/users';
import { DeleteStudentComponent } from './components/delete-student/delete-student.component';
import { RegisterStudentComponent } from './components/register-student/register-student.component';
import { StudentsActions } from './store/students.actions';
import { selectStudents, selectStudentsError, selectStudentsIsLoading } from './store/students.selectors';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'nationality', 'actions'];
  students$: Observable<Student[]>;
  isLoadingStudents$: Observable<boolean>;
  error$: Observable<unknown>
  authUser$: Observable<User | null>;

  constructor(
    private matDialog: MatDialog,
    private store: Store<RootState>
  ) {

    this.authUser$ = this.store.select(selectAuthUser);
    this.students$ = this.store.select(selectStudents);
    this.isLoadingStudents$ = this.store.select(selectStudentsIsLoading);
    this.error$ = this.store.select(selectStudentsError)
  }

  ngOnInit(): void {
    this.store.dispatch(StudentsActions.loadStudents())
  }

  openDialog(): void {
    this.matDialog
      .open(RegisterStudentComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.store.dispatch(StudentsActions.addStudents({ newStudent: value }))
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
            this.store.dispatch(StudentsActions.editStudents({id: editingStudent.id, editedStudent: value}))
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
            this.store.dispatch(StudentsActions.deleteStudents({ id }))
          }
        },
      });
  }



}
