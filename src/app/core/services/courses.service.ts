import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { Course } from '../../models/course.model';

@Injectable({
    providedIn: 'root'
})

export class CoursesService {

    private COURSES_DB = [
        {
            id: "e5gerh",
            courseName: "Angular",
            courseDescription: "Angular course and Typescript",
        },
        {
            id: "34hrh",
            courseName: "HTML",
            courseDescription: "Web development with HTML",
        },
        {
            id: "8h56h",
            courseName: "Javascript",
            courseDescription: "Javascript for front-end development",
        },
    ];

    getCourses(): Observable<Course[]> {
        return of(this.COURSES_DB).pipe(delay(2000))
    };

    getStudentById(id: string): Observable<Course | undefined> {
        return this.getCourses().pipe(
            map((courses) => courses.find((el) => el.id === id))
        )
    };

    addCourse(course: Course): Observable<Course[]> {
        this.COURSES_DB.push(course);
        return this.getCourses()
    };

    deleteCourseById (id: string): Observable<Course[]> {
        this.COURSES_DB = this.COURSES_DB.filter((el) => el.id != id);
        return this.getCourses()
    };

    editCourse(id: string, editedCourse: Course): Observable<Course[]> {
        this.COURSES_DB = this.COURSES_DB.map((el) =>
            el.id === id
              ? { ...editedCourse, id }
              : el
          );
        return this.getCourses()
    };

}
