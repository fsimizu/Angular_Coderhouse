import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCourses from './courses.reducer';

export const selectCoursesState = createFeatureSelector<fromCourses.State>(
  fromCourses.coursesFeatureKey
);

export const selectCourses = createSelector(selectCoursesState,
  (state) => state.courses)

export const selectCoursesIsLoading = createSelector(selectCoursesState,
  (state) => state.isLoadingCourses)

export const selectCoursesError = createSelector(selectCoursesState,
  (state) => state.error)

export const selectCourse = createSelector(selectCoursesState,
    (state) => state.course)

export const selectCourseStudents = createSelector(selectCoursesState,
  (state) => state.courseStudents)