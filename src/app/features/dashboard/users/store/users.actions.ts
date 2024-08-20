import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { EnrollmentEmbeded } from '../../../../shared/models/enrollment.model';
import { User } from '../../../../shared/models/users';

export const UsersActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Load Users Success': props<{ data: User[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    'Add Users': props<{ newUser: User }>(),
    'Add Users Success': props<{ data: User }>(),
    'Add Users Failure': props<{ error: unknown }>(),

    'Delete Users': props<{ id: string }>(),
    'Delete Users Success': props<{ data: User }>(),
    'Delete Users Failure': props<{ error: unknown }>(),

    'Edit Users': props<{ id: string, editedUser: User }>(),
    'Edit Users Success': props<{ data: User }>(),
    'Edit Users Failure': props<{ error: unknown }>(),

    'Load UserById': props<{ id: string }>(),
    'Load UserById Success': props<{ data: User }>(),
    'Load UserById Failure': props<{ error: unknown }>(),

    'Load UserCourses': props<{ id: string }>(),
    'Load UserCourses Success': props<{ data: EnrollmentEmbeded[] }>(),
    'Load UserCourses Failure': props<{ error: unknown }>(),
  }
});
