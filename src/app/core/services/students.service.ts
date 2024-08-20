import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Student } from '../../shared/models/student.model';
import { EnrollmentEmbeded } from '../../shared/models/enrollment.model';

@Injectable({
    providedIn: 'root'
})

export class StudentsService {
    constructor(private httpClient: HttpClient){}

    getStudents(): Observable<Student[]> {
        return this.httpClient.get<Student[]>(environment.apiUrl + '/students')
    };

    getStudentById(id: string): Observable<Student> {
        return this.httpClient.get<Student>(environment.apiUrl + '/students/' + id )
    };

    getStudentCourses(id: string): Observable<EnrollmentEmbeded[]> {           
        return this.httpClient.get<EnrollmentEmbeded[]>(environment.apiUrl + '/enrollments?studentId=' + id + '&_embed=student&_embed=course')
    };

    addStudent(student: Student): Observable<Student> {
        return this.httpClient.post<Student>(environment.apiUrl + '/students', student)
    };

    deleteStudentById(id: string): Observable<Student> {
        return this.httpClient.delete<Student>(environment.apiUrl + '/students/' + id)
    };

    editStudent(id: string, editedStudent: Student): Observable<Student> {
        return this.httpClient.put<Student>(environment.apiUrl + '/students/' + id, editedStudent)
    };

}
