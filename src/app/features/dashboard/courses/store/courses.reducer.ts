import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../../../../shared/models/course.model';
import { EnrollmentsActions } from '../../enrollments/store/enrollments.actions';
import { Student } from '../../../../shared/models/student.model';
import { EnrollmentEmbeded } from '../../../../shared/models/enrollment.model';

export const coursesFeatureKey = 'courses';

export interface State {
  isLoadingCourses: boolean,
  courses: Course[],
  error: unknown,
  course: Course | undefined,
  students: Student[],
  courseStudents: EnrollmentEmbeded[]
}

export const initialState: State = {
  isLoadingCourses: false,
  course: undefined,
  courses: [],
  error: null,
  students: [],
  courseStudents: []
};

export const reducer = createReducer(
  initialState,

  // Load Courses
  on(CoursesActions.loadCourses, (state) => {
    return {
      ...state,
      isLoadingCourses: true
    }
  }),
  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      courses: action.data,
      error: null
    }
  }),
  on(CoursesActions.loadCoursesFailure, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      error: action.error
    }
  }),

  // Load Course by ID
  on(CoursesActions.loadCourseById, (state) => {
    return {
      ...state,
      isLoadingCourses: true
    }
  }),
  on(CoursesActions.loadCourseByIdSuccess, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      course: action.data,
      error: null
    }
  }),
  on(CoursesActions.loadCourseByIdFailure, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      error: action.error
    }
  }),

  // Add Courses
  on(CoursesActions.addCourses, (state) => {
    return {
      ...state,
      isLoadingCourses: true,
    }
  }),
  on(CoursesActions.addCoursesSuccess, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      courses: [...state.courses, action.data],
      error: null
    }
  }),
  on(CoursesActions.addCoursesFailure, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      error: action.error,
    }
  }),

  // Delete Courses
  on(CoursesActions.deleteCourses, (state) => {
    return {
      ...state,
      isLoadingCourses: true,
    }
  }),
  on(CoursesActions.deleteCoursesSuccess, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      courses: state.courses.filter((course) => course.id !== action.data.id),
      error: null
    }
  }),
  on(CoursesActions.deleteCoursesFailure, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      error: action.error,
    }
  }),

  // Edit Course
  on(CoursesActions.editCourses, (state) => {
    return {
      ...state,
      isLoadingCourses: true,
    }
  }),
  on(CoursesActions.editCoursesSuccess, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      courses: state.courses.map(obj => {
        if (obj.id === action.data.id) {
          return {
            ...obj,
            courseName: action.data.courseName,
            courseDescription: action.data.courseDescription,
          }
        }
        return obj
      }),
      error: null
    }
  }),
  on(CoursesActions.editCoursesFailure, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      error: action.error,
    }
  }),


  // Load Courses + Students form enrollments
  on(CoursesActions.loadCourseStudents, (state) => {
    return {
      ...state,
      isLoadingCourses: true
    }
  }),
  on(CoursesActions.loadCourseStudentsSuccess, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      courseStudents: action.data,
      error: null
    }
  }),
  on(CoursesActions.loadCourseStudentsFailure, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      error: action.error
    }
  }),


  // Unenroll course from student
  on(EnrollmentsActions.deleteEnrollmentByCourseAndStudent, (state) => {
    return {
      ...state,
      isLoadingCourses: true
    }
  }),
  on(EnrollmentsActions.deleteEnrollmentByCourseAndStudentSuccess, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      courseStudents: state.courseStudents.filter((enrollment) => enrollment.studentId !== action.data.studentId),
      error: null
    }
  }),
  on(EnrollmentsActions.deleteEnrollmentByCourseAndStudentFailure, (state, action) => {
    return {
      ...state,
      isLoadingCourses: false,
      error: action.error
    }
  }),



);


export const CoursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});