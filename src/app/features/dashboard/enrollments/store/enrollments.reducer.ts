import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentsActions } from './enrollments.actions';
import { Enrollment } from '../../../../shared/models/enrollment.model';
import { Student } from '../../../../shared/models/student.model';
import { Course } from '../../../../shared/models/course.model';

export const enrollmentsFeatureKey = 'enrollments';

export interface State {
  isLoading: boolean;
  isLoadingStudentsAndCourses: boolean;
  enrollments: Enrollment[];
  students: Student[];
  courses: Course[];
  error: unknown;
}

export const initialState: State = {
  isLoading: false,
  isLoadingStudentsAndCourses: false,
  enrollments: [],
  students: [],
  courses: [],
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(EnrollmentsActions.loadStudentsAndCourses, (state) => {
    return {
      ...state,
      isLoadingStudentsAndCourses: true
    }
  }),
  on(EnrollmentsActions.loadStudentsAndCoursesSucess, (state, action) => {
    return {
      ...state,
      isLoadingStudentsAndCourses: false,
      students: action.data.students,
      courses: action.data.courses,
      error: null
    }
  }),
  on(EnrollmentsActions.loadStudentsAndCoursesFailure, (state, action) => {
    return {
      ...state,
      isLoadingStudentsAndCourses: false,
      error: action.error
    }
  }),

);

export const enrollmentsFeature = createFeature({
  name: enrollmentsFeatureKey,
  reducer,
});

