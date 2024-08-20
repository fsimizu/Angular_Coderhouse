import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Course } from '../../shared/models/course.model';
import { EnrollmentEmbeded } from '../../shared/models/enrollment.model';

@Injectable({
    providedIn: 'root'
})

export class CoursesService {
    constructor(private httpClient: HttpClient){}

    getCourses(): Observable<Course[]> {
        return this.httpClient.get<Course[]>(environment.apiUrl + '/courses')
    };
    
    getCourseById(id: string): Observable<Course> {
        return this.httpClient.get<Course>(environment.apiUrl + '/courses/' + id )
    };

    getCoursesStudents (id: string): Observable<EnrollmentEmbeded[]> {           
        return this.httpClient.get<EnrollmentEmbeded[]>(environment.apiUrl + '/enrollments?courseId=' + id + '&_embed=course&_embed=student')
    };

    addCourse(course: Course): Observable<Course> {
        return this.httpClient.post<Course>(environment.apiUrl + '/courses', course)
    };

    deleteCourseById (id: string): Observable<Course> {
        return this.httpClient.delete<Course>(environment.apiUrl + '/courses/' + id)
    };

    editCourse(id: string, editedCourse: Course): Observable<Course> {
        return this.httpClient.put<Course>(environment.apiUrl + '/courses/' + id, editedCourse)
    };

}
