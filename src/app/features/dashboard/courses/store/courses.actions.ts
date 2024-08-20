import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Course } from '../../../../shared/models/course.model';
import { EnrollmentEmbeded } from '../../../../shared/models/enrollment.model';

export const CoursesActions = createActionGroup({
  source: 'Courses',
  events: {
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Course[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),

    'Load CourseById': props<{ id: string }>(),
    'Load CourseById Success': props<{ data: Course }>(),
    'Load CourseById Failure': props<{ error: unknown }>(),

    'Load CourseStudents': props<{ id: string }>(),
    'Load CourseStudents Success': props<{ data: EnrollmentEmbeded[] }>(),
    'Load CourseStudents Failure': props<{ error: unknown }>(),

    'Add Courses': props<{ newCourse: Course }>(),
    'Add Courses Success': props<{ data: Course }>(),
    'Add Courses Failure': props<{ error: unknown }>(),

    'Delete Courses': props<{ id: string }>(),
    'Delete Courses Success': props<{ data: Course }>(),
    'Delete Courses Failure': props<{ error: unknown }>(),

    'Edit Courses': props<{ id: string, editedCourse: Course }>(),
    'Edit Courses Success': props<{ data: Course }>(),
    'Edit Courses Failure': props<{ error: unknown }>(),

  }
});
