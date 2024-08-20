import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../../../core/store';
import { EnrollmentEmbeded } from '../../../../../shared/models/enrollment.model';
import { Student } from '../../../../../shared/models/student.model';
import { EnrollmentsActions } from '../../../enrollments/store/enrollments.actions';
import { UnenrollStudentComponent } from '../../components/unenroll-student/unenroll-student.component';
import { StudentsActions } from '../../store/students.actions';
import { selectStudent, selectStudentCourses, selectStudentsIsLoading } from '../../store/students.selectors';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent implements OnInit{
  student$: Observable<Student | undefined>;
  studentCourses$: Observable<EnrollmentEmbeded[]>;
  isLoadingStudents$: Observable<boolean>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private store: Store<RootState>,
    private matDialog: MatDialog,

  ) {
    this.isLoadingStudents$ = this.store.select(selectStudentsIsLoading);
    this.student$ = this.store.select(selectStudent);
    this.studentCourses$ = this.store.select(selectStudentCourses);
  }

  ngOnInit(): void {    
    this.store.dispatch(StudentsActions.loadStudentById({id: this.activatedRoute.snapshot.params['id']} ))
    this.store.dispatch(StudentsActions.loadStudentCourses({id: this.activatedRoute.snapshot.params['id']} ))
  }

  unenroll(courseId: string, studentId: string): void {
    this.matDialog
      .open(UnenrollStudentComponent)
      .afterClosed()
      .subscribe({
        next: (answer) => {
          if (answer) {
            this.store.dispatch(EnrollmentsActions.deleteEnrollmentByCourseAndStudent({ courseId: courseId, studentId: studentId }))
          }
        },
      });
  }

  goBack(): void {
    this.location.back();
  }

}
