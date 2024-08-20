import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment, StudentAndCourse } from '../../../../shared/models/enrollment.model';

export const EnrollmentsActions = createActionGroup({
  source: 'Enrollments',
  events: {
    'Load Students and Courses': emptyProps(),
    'Load Students and Courses Sucess': props<{ data: StudentAndCourse }>(),
    'Load Students and Courses Failure': props<{ error: unknown }>(),

    'Create Enrollment': props<{ payload: Enrollment }>(),
    'Create Enrollment Success': props<{ data: Enrollment }>(),
    'Create Enrollment Failure': props<{ error: unknown }>(),

    'Load EnrollmentByCourse': props<{ courseId: string }>(),
    'Load EnrollmentByCourse Sucess': props<{ data: Enrollment[] }>(),
    'Load EnrollmentByCourse Failure': props<{ error: unknown }>(),

    'Delete EnrollmentByCourseAndStudent': props<{ courseId: string, studentId: string }>(),
    'Delete EnrollmentByCourseAndStudent Success': props<{ data: Enrollment }>(),
    'Delete EnrollmentByCourseAndStudent Failure': props<{ error: unknown }>(),
  }
});
