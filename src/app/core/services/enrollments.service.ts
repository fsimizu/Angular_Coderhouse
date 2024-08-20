import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Enrollment, StudentAndCourse } from '../../shared/models/enrollment.model';
import { Student } from '../../shared/models/student.model';
import { Course } from '../../shared/models/course.model';

@Injectable({
  providedIn: 'root'
})

export class EnrollmentsService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getEnrollments(): Observable<Enrollment[]> {
    return this.httpClient.get<Enrollment[]>(environment.apiUrl + '/enrollments?_embed=student&embed=course')
  }

  getEnrollmentsByCourse(courseId: string): Observable<Enrollment[]> {
    return this.getEnrollments().pipe(
      map((courses) => courses.filter((el) => el.courseId === courseId))
    )
  }

  getEnrollmentsByStudent(studentId: string): Observable<Enrollment[]> {
    return this.getEnrollments().pipe(
      map((student) => student.filter((el) => el.studentId === studentId))
    )
  }

  getEnrollmentByCourseAndStudent(courseId: string, studentId: string): Observable<Enrollment[]> {
      const enrollmentsByCourse$ = this.httpClient.get<Enrollment[]>(environment.apiUrl + '/enrollments?courseId=' + courseId)
      const enrollmentsByStudent$ = this.httpClient.get<Enrollment[]>(environment.apiUrl + '/enrollments?studentId=' + studentId)
    return forkJoin([enrollmentsByCourse$, enrollmentsByStudent$])
      .pipe(
        map(([enrollmentsByCourse, enrollmentsByStudent]) => {
          return enrollmentsByCourse.filter(ec =>
            enrollmentsByStudent.some(es => ec.studentId === es.studentId)
          )
        })
      )
  }

  addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
    const url = environment.apiUrl + '/enrollments';    
    return this.httpClient.get<Enrollment[]>(url, { params: { studentId: enrollment.studentId } })
      .pipe(
        switchMap(enrollments => {
          const existingEnrollment = enrollments.find(e => e.courseId === enrollment.courseId);
          if (existingEnrollment) {
            return throwError(() => new Error('Student already enrolled in this course'));
          } else {
            return this.httpClient.post<Enrollment>(url, enrollment);
          }
        }),
      );
  };

  getStudentsAndCourses(): Observable<StudentAndCourse> {
    return forkJoin({
      students: this.httpClient.get<Student[]>(environment.apiUrl + '/students'),
      courses: this.httpClient.get<Course[]>(environment.apiUrl + '/courses')
    })
  }


  deleteEnrollment(enrollmentId: string | undefined): Observable<Enrollment> {
    return this.httpClient.delete<Enrollment>(environment.apiUrl + '/enrollments/' + enrollmentId)
  }


}