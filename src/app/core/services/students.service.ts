import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Student } from '../../models/student.model';

@Injectable({
    providedIn: 'root'
})

export class StudentsService {

    private STUDENTS_DB = [
        {
            id: "h45fj",
            firstName: "Fernando",
            lastName: "Chapa",
            gender: "male",
            nationality: 'Argentina',
            dateOfBirth: new Date('10/02/1999')
        },
        {
            id: "4h65z",
            firstName: "Lucas",
            lastName: "Rodriguez",
            gender: "male",
            nationality: 'Mexico',
            dateOfBirth: new Date('10/02/1999')
        },
        {
            id: "dfkka",
            firstName: "Sofia",
            lastName: "Gomez",
            gender: "female",
            nationality: 'Uruguay',
            dateOfBirth: new Date('10/02/1999')
        }
    ];

    getStudents(): Observable<Student[]> {
        // return new Observable((observer) => {
        //     setTimeout(() => {
        //         observer.next(this.STUDENTS_DB);
        //         observer.complete();
        //     }, 2000)
        // })
        return of(this.STUDENTS_DB).pipe(delay(2000))
    };

    getStudentById(id: string): Observable<Student | undefined> {
        return this.getStudents().pipe(
            map((students) => students.find((el) => el.id === id))
        )
    };

    addStudent(student: Student): Observable<Student[]> {
        this.STUDENTS_DB.push(student);
        return this.getStudents()
    };

    deleteStudentById(id: string): Observable<Student[]> {
        this.STUDENTS_DB = this.STUDENTS_DB.filter((el) => el.id != id);
        return this.getStudents()
    };

    editStudent(id: string, editedStudent: Student): Observable<Student[]> {
        this.STUDENTS_DB = this.STUDENTS_DB.map((el) =>
            el.id === id
                ? { ...editedStudent, id }
                : el
        );
        return this.getStudents()
    };

}
