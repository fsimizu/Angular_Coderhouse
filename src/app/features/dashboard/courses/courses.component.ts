import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../core/store';
import { selectAuthUser } from '../../../core/store/auth/auth.selectors';
import { Course } from '../../../shared/models/course.model';
import { User } from '../../../shared/models/users';
import { DeleteCourseComponent } from './components/delete-course/delete-course.component';
import { RegisterCourseComponent } from './components/register-course/register-course.component';
import { CoursesActions } from './store/courses.actions';
import { selectCourses, selectCoursesError, selectCoursesIsLoading } from './store/courses.selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'courseName', 'courseDescription', 'actions'];
  courses: Course[] = [];
  courses$: Observable<Course[]>;
  isLoadingCourses$: Observable<boolean>;
  error$: Observable<unknown>
  authUser$: Observable<User | null>;
  isLoading = false

  constructor(
    private matDialog: MatDialog,
    private store: Store<RootState>
  ) { 
    this.authUser$ = this.store.select(selectAuthUser);
    this.courses$ = this.store.select(selectCourses);
    this.isLoadingCourses$ = this.store.select(selectCoursesIsLoading);
    this.error$ = this.store.select(selectCoursesError)
  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourses())
  }

  openDialog(): void {
    this.matDialog
      .open(RegisterCourseComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.store.dispatch(CoursesActions.addCourses({ newCourse: value }))
          }
        }
      });
  }

  editCourse(editingCourse: Course) {
    this.matDialog
      .open(RegisterCourseComponent, { data: editingCourse })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.store.dispatch(CoursesActions.editCourses({id: editingCourse.id, editedCourse: value}))
          }
        },
      });
  }

  deleteCourseById(id: string) {
    this.matDialog
      .open(DeleteCourseComponent)
      .afterClosed()
      .subscribe({
        next: (answer) => {
          if (answer) {
            this.store.dispatch(CoursesActions.deleteCourses({ id }))
          }
        },
      });
  }


}
