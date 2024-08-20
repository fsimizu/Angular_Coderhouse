import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Enrollment, EnrollmentEmbeded } from '../../../../shared/models/enrollment.model';
import { Student } from '../../../../shared/models/student.model';

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ data: Student[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),

    'Add Students': props<{ newStudent: Student }>(),
    'Add Students Success': props<{ data: Student }>(),
    'Add Students Failure': props<{ error: unknown }>(),

    'Delete Students': props<{ id: string }>(),
    'Delete Students Success': props<{ data: Student }>(),
    'Delete Students Failure': props<{ error: unknown }>(),

    'Edit Students': props<{ id: string, editedStudent: Student }>(),
    'Edit Students Success': props<{ data: Student }>(),
    'Edit Students Failure': props<{ error: unknown }>(),

    'Load StudentById': props<{ id: string }>(),
    'Load StudentById Success': props<{ data: Student }>(),
    'Load StudentById Failure': props<{ error: unknown }>(),

    'Load StudentCourses': props<{ id: string }>(),
    'Load StudentCourses Success': props<{ data: EnrollmentEmbeded[] }>(),
    'Load StudentCourses Failure': props<{ error: unknown }>(),

  }
});
