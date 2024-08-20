import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { forkJoin, of } from 'rxjs';
import { catchError, concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { EnrollmentsService } from '../../../../core/services/enrollments.service';
import { NotifierService } from '../../../../core/services/notifier.service';
import { EnrollmentsActions } from './enrollments.actions';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class EnrollmentsEffects {

  loadStudentsAndCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(EnrollmentsActions.loadStudentsAndCourses),
      concatMap(() =>
        this.enrollmentsService.getStudentsAndCourses()
          .pipe(
            map(data => EnrollmentsActions.loadStudentsAndCoursesSucess({ data })),
            catchError(error => of(EnrollmentsActions.loadStudentsAndCoursesFailure({ error }))))
      )
    );
  });

  createEnrollment$ = createEffect(() => {   
    return this.actions$.pipe(
      ofType(EnrollmentsActions.createEnrollment),
      concatMap((action) =>
        this.enrollmentsService.addEnrollment(action.payload)
          .pipe(
            map((data) => {
              this.notifier.sendNotification('Student enrolled successfully', 'success');
              return EnrollmentsActions.createEnrollmentSuccess({ data })
            }),
            catchError((error) => {
              this.notifier.sendNotification('Student is already enrolled', 'warning');
              return of(EnrollmentsActions.createEnrollmentFailure({ error })) 
          }),
          ),
      )
    );
  });

  // deleteEnrollmentByCourseAndStudent$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(EnrollmentsActions.deleteEnrollmentByCourseAndStudent),
  //     mergeMap((action) =>
  //       this.enrollmentsService.getEnrollmentByCourseAndStudent(action.courseId, action.studentId)
  //         .pipe(
  //           mergeMap(enrollment => {
  //             console.log("effectttt");
              
  //             return this.enrollmentsService.deleteEnrollment(enrollment[0].id)
  //               .pipe(
  //                 map((data) => EnrollmentsActions.deleteEnrollmentByCourseAndStudentSuccess({ data })),
  //                 catchError((error) => of(EnrollmentsActions.deleteEnrollmentByCourseAndStudentFailure({ error }))),
  //               )
  //           }
  //           )
  //         )
  //     )
  //   )
  // });

  constructor(
    private actions$: Actions,
    private enrollmentsService: EnrollmentsService,
    private notifier: NotifierService,

  ) { }
}
