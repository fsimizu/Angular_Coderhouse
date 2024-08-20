import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, tap } from 'rxjs/operators';
import { StudentsService } from '../../../../core/services/students.service';
import { StudentsActions } from './students.actions';
import { EnrollmentsActions } from '../../enrollments/store/enrollments.actions';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';

@Injectable()
export class StudentsEffects {

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      concatMap(() =>
        this.studentsService.getStudents()
          .pipe(
            map(data => StudentsActions.loadStudentsSuccess({ data })),
            catchError(error => of(StudentsActions.loadStudentsFailure({ error }))))
      )
    );
  });

  addStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.addStudents),
      concatMap((action) =>
        this.studentsService.addStudent(action.newStudent)
          .pipe(
            map(student => StudentsActions.addStudentsSuccess({ data: student })),
            catchError(error => of(StudentsActions.addStudentsFailure({ error })))
          ))
    );
  });

  deleteStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.deleteStudents),
      concatMap((action) =>
        this.studentsService.deleteStudentById(action.id)
          .pipe(
            map((data) => StudentsActions.deleteStudentsSuccess({ data })),
            catchError(error => of(StudentsActions.deleteStudentsFailure({ error })))
          ))
    );
  });


  editStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.editStudents),
      concatMap((action) => {
        return this.studentsService.editStudent(action.id, action.editedStudent)
          .pipe(
            map((data) => StudentsActions.editStudentsSuccess({ data })),
            catchError(error => of(StudentsActions.editStudentsFailure({ error }))))
      })
    );
  });

  loadStudentById$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudentById),
      concatMap((action) => {
        return this.studentsService.getStudentById(action.id)
          .pipe(
            map(data => StudentsActions.loadStudentByIdSuccess({ data })),
            catchError(error => of(StudentsActions.loadStudentByIdFailure({ error }))))
      })
    );
  });

  loadStudentCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudentCourses),
      concatMap((action) => {
        return this.studentsService.getStudentCourses(action.id)
          .pipe(
            map(data => StudentsActions.loadStudentCoursesSuccess({ data })),
            catchError(error => of(StudentsActions.loadStudentCoursesFailure({ error }))))
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
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) { }
}
