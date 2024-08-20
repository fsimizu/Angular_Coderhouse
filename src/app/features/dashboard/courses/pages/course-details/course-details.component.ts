import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { RootState } from '../../../../../core/store';
import { Course } from '../../../../../shared/models/course.model';
import { EnrollmentEmbeded } from '../../../../../shared/models/enrollment.model';
import { EnrollmentsActions } from '../../../enrollments/store/enrollments.actions';
import { CoursesActions } from '../../store/courses.actions';
import { selectCourse, selectCoursesIsLoading, selectCourseStudents } from '../../store/courses.selectors';
import { UnenrollCourseComponent } from '../../components/unenroll-course/unenroll-course.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})

export class CourseDetailsComponent implements OnInit {
  course$: Observable<Course | undefined>
  students$: Observable<any | undefined> = of(undefined)
  isLoadingCourses$: Observable<boolean>;
  courseStudents$: Observable<EnrollmentEmbeded[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private store: Store<RootState>,
    private matDialog: MatDialog,
  ) {
    this.isLoadingCourses$ = this.store.select(selectCoursesIsLoading);
    this.course$ = this.store.select(selectCourse);

    // this.students$ = this.enrollmentsService
    // .getEnrollmentsByCourse(this.activatedRoute.snapshot.params['id'])
    // .pipe(
    //   mergeMap((enrollments: Enrollment[]) => {
    //     const studentIds = enrollments.map((enrollment: Enrollment) => enrollment.studentId);  
    //     return forkJoin(
    //       studentIds.map((studentId: string) =>
    //         this.studentsService.getStudentById(studentId)
    //         .pipe(
    //           catchError((error: string) => {
    //             console.error('Error fetching student:', error);
    //             return of(null);
    //           })
    //         )
    //       )
    //     )
    //   })
    // );

    this.courseStudents$ = this.store.select(selectCourseStudents);


  }

  ngOnInit(): void {
    this.store.dispatch(CoursesActions.loadCourseById({ id: this.activatedRoute.snapshot.params['id'] }))
    this.store.dispatch(CoursesActions.loadCourseStudents({ id: this.activatedRoute.snapshot.params['id'] }))
  }

  unenroll(courseId: string, studentId: string): void {
    this.matDialog
      .open(UnenrollCourseComponent)
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
