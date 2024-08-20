import { createFeature, createReducer, on } from '@ngrx/store';
import { EnrollmentEmbeded } from '../../../../shared/models/enrollment.model';
import { Student } from '../../../../shared/models/student.model';
import { EnrollmentsActions } from '../../enrollments/store/enrollments.actions';
import { StudentsActions } from './students.actions';

export const studentsFeatureKey = 'students';

export interface State {
  isLoadingStudents: boolean,
  students: Student[],
  error: unknown,
  student: Student | undefined
  studentCourses: EnrollmentEmbeded[]
}

export const initialState: State = {
  isLoadingStudents: false,
  students: [],
  error: null,
  student: undefined,
  studentCourses: []
};

export const reducer = createReducer(
  initialState,

  // Load Students
  on(StudentsActions.loadStudents, (state) => {
    return {
      ...state,
      isLoadingStudents: true
    }}),
  on(StudentsActions.loadStudentsSuccess, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      students: action.data,
      error: null
    }}),
  on(StudentsActions.loadStudentsFailure, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      error: action.error
    }}),

  // Add Students
  on(StudentsActions.addStudents, (state) => {
    return {
      ...state,
      isLoadingStudents: true,
    }}),
  on(StudentsActions.addStudentsSuccess, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      students: [...state.students, action.data],
      error: null
    }}),
  on(StudentsActions.addStudentsFailure, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      error: action.error,
    }}),

  // Delete Student
  on(StudentsActions.deleteStudents, (state) => {
    return {
      ...state,
      isLoadingStudents: true,
    }}),
  on(StudentsActions.deleteStudentsSuccess, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      students: state.students.filter((student) => student.id !== action.data.id),
      error: null
    }}),
  on(StudentsActions.deleteStudentsFailure, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      error: action.error,
    }}),

  // Edit Student
  on(StudentsActions.editStudents, (state) => {
    return {
      ...state,
      isLoadingStudents: true,
    }
  }),
  on(StudentsActions.editStudentsSuccess, (state, action) => {

    return {
      ...state,
      isLoadingStudents: false,
      students: state.students.map(obj => {
        if (obj.id === action.data.id) {
          return {
            ...obj,
            firstName: action.data.firstName,
            lastName: action.data.lastName,
            gender: action.data.gender,
            nationality: action.data.nationality,
            dateOfBirth: action.data.dateOfBirth
          }
        }
        return obj
      }),

      error: null
    }
  }),
  on(StudentsActions.editStudentsFailure, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      error: action.error,
    }
  }),

  // Load Student by ID
  on(StudentsActions.loadStudentById, (state) => {
    return {
      ...state,
      isLoadingStudents: true
    }
  }),
  on(StudentsActions.loadStudentByIdSuccess, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      student: action.data,
      error: null
    }
  }),
  on(StudentsActions.loadStudentByIdFailure, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      error: action.error
    }
  }),

  // Load Student Courses (student + courses enrolled)
  on(StudentsActions.loadStudentCourses, (state) => {
    return {
      ...state,
      isLoadingStudents: true
    }
  }),
  on(StudentsActions.loadStudentCoursesSuccess, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      studentCourses: action.data,
      error: null
    }
  }),
  on(StudentsActions.loadStudentCoursesFailure, (state, action) => {
    return {
      ...state,
      isLoadingStudents: false,
      error: action.error
    }
  }),
  

  // Unenroll user from course
  on(EnrollmentsActions.deleteEnrollmentByCourseAndStudent, (state) => {    
    return {
      ...state,
      isLoadingStudentsAndCourses: true
    }
  }),
  on(EnrollmentsActions.deleteEnrollmentByCourseAndStudentSuccess, (state, action) => {    
    return {
      ...state,
      isLoadingStudentsAndCourses: false,
      studentCourses: state.studentCourses.filter((enrollment) => enrollment.courseId !== action.data.courseId),
      error: null
    }
  }),
    on(EnrollmentsActions.deleteEnrollmentByCourseAndStudentFailure, (state, action) => {
    return {
      ...state,
      isLoadingStudentsAndCourses: false,
      error: action.error
    }
  }),
);



export const StudentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
});

