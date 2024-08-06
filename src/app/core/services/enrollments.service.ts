import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Enrollment } from '../../shared/models/enrollment.model';

@Injectable({
    providedIn: 'root'
})

export class EnrollmentsService {

    constructor(
        private httpClient: HttpClient
    ){}

    getEnrollments(): Observable<Enrollment[]> {
        return this.httpClient.get<Enrollment[]>(environment.apiUrl + '/enrollments')
    }

    getEnrollmentsByCourse(courseId: string): Observable<Enrollment[] | undefined> {
        return this.getEnrollments().pipe(
            map((courses) => courses.filter((el) => el.courseId === courseId))
        )
    }

    getEnrollmentsByStudent(studentId: string): Observable<Enrollment[] | undefined> {
        return this.getEnrollments().pipe(
            map((student) => student.filter((el) => el.studentId === studentId))
        )
    }

addEnrollment(enrollment: Enrollment): Observable<Enrollment> {
  const url = environment.apiUrl + '/enrollments';
  const body = enrollment;

  return this.httpClient.get<Enrollment[]>(url, { params: { studentId: enrollment.studentId } })
    .pipe(
      switchMap(enrollments => {
        const existingEnrollment = enrollments.find(e => e.courseId === enrollment.courseId);
        if (existingEnrollment) {
          return throwError(() => new Error('Student already enrolled in this course'));
        } else {
          return this.httpClient.post<Enrollment>(url, body);
        }
      }),
      catchError((error) => {
        console.error('Error:', error);
        return throwError(error);
      })
    );
}


}