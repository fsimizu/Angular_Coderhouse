import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { CoursesService } from '../../../../core/services/courses.service';
import { CoursesActions } from './courses.actions';
import { EnrollmentsActions } from '../../enrollments/store/enrollments.actions';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';


@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses()
        .pipe(
          map(data => CoursesActions.loadCoursesSuccess({ data })),
          catchError(error => of(CoursesActions.loadCoursesFailure({ error }))))
      )
    );
  });

  loadCourseById$ = createEffect(() => {   
    return this.actions$.pipe(
      ofType(CoursesActions.loadCourseById),
      concatMap((action) =>
        this.coursesService.getCourseById(action.id)
        .pipe(
          map(data => CoursesActions.loadCourseByIdSuccess({ data })),
          catchError(error => of(CoursesActions.loadCourseByIdFailure({ error }))))
      )
    );
  });

  loadCourseStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.loadCourseStudents),
      concatMap((action) => {
        return this.coursesService.getCoursesStudents(action.id)
          .pipe(
            map(data => CoursesActions.loadCourseStudentsSuccess({ data })),
            catchError(error => of(CoursesActions.loadCourseStudentsFailure({ error }))))
      })
    );
  });


  addCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.addCourses),
      concatMap((action) =>
        this.coursesService.addCourse(action.newCourse)
          .pipe(
            map(course => CoursesActions.addCoursesSuccess({ data: course })),
            catchError(error => of(CoursesActions.addCoursesFailure({ error })))
          ))
    );
  });

  deleteCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.deleteCourses),
      concatMap((action) =>
        this.coursesService.deleteCourseById(action.id)
          .pipe(
            map((data) => CoursesActions.deleteCoursesSuccess({ data })),
            catchError(error => of(CoursesActions.deleteCoursesFailure({ error })))
          ))
    );
  });

  editCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoursesActions.editCourses),
      concatMap((action) => {
        return this.coursesService.editCourse(action.id, action.editedCourse)
          .pipe(
            map((data) => CoursesActions.editCoursesSuccess({ data })),
            catchError(error => of(CoursesActions.editCoursesFailure({ error }))))
      })
    );
  });

  deleteEnrollmentByCourseAndStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.deleteEnrollmentByCourseAndStudent),
      mergeMap((action) =>
        this.enrollmentsService.getEnrollmentByCourseAndStudent(action.courseId, action.studentId)
          .pipe(
            mergeMap(enrollment => {              
              return this.enrollmentsService.deleteEnrollment(enrollment[0].id)
                .pipe(
                  map((data) => EnrollmentsActions.deleteEnrollmentByCourseAndStudentSuccess({ data })),
                  catchError((error) => of(EnrollmentsActions.deleteEnrollmentByCourseAndStudentFailure({ error }))),
                )
            }
            )
          )
      )
    )
  });


  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService
  ) {}
}
