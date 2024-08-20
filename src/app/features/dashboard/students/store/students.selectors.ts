import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStudents from './students.reducer';

export const selectStudentsState = createFeatureSelector<fromStudents.State>(
  fromStudents.studentsFeatureKey
);

export const selectStudents = createSelector(selectStudentsState,
  (state) => state.students)

export const selectStudentsIsLoading = createSelector(selectStudentsState,
  (state) => state.isLoadingStudents)

export const selectStudentsError = createSelector(selectStudentsState,
  (state) => state.error)

export const selectStudent = createSelector(selectStudentsState,
  (state) => state.student)

export const selectStudentCourses = createSelector(selectStudentsState,
  (state) => state.studentCourses)