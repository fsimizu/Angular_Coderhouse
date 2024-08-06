import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Student } from '../../shared/models/student.model';


@Injectable({
    providedIn: 'root'
})

export class StudentsService {

    constructor(private httpClient: HttpClient){}

    getStudents(): Observable<Student[]> {
        return this.httpClient.get<Student[]>(environment.apiUrl + '/students')
    };

    getStudentById(id: string): Observable<Student | undefined> {
        return this.getStudents().pipe(
            map((students) => students.find((el) => el.id === id))
        )
    };

    addStudent(student: Student): Observable<Student[]> {
        //Solo si el form es valido!
        return this.httpClient.post<Student[]>(environment.apiUrl + '/students', student)
    };

    deleteStudentById(id: string): Observable<Student[]> {
        return this.httpClient.delete<Student[]>(environment.apiUrl + '/students/' + id)

    };

    editStudent(id: string, editedStudent: Student): Observable<Student[]> {
        return this.httpClient.put<Student[]>(environment.apiUrl + '/students/' + id, editedStudent)
    };

}
