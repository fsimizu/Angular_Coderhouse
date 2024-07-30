import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Enrollment } from '../../shared/models/enrollment.model';

@Injectable({
    providedIn: 'root'
})



export class EnrollementsService {

    private ENROLLMENT_DB: Enrollment[] = [
        {
            studentId: '1f3w4t',
            courseId: 'w324va'
        },
        {
            studentId: '4324ht',
            courseId: 's5j45j'
        },
        {
            studentId: 'stj55',
            courseId: 'w324va'
        }
    ]

    getEnrollments(): Observable<Enrollment[]> {
        return of<Enrollment[]>(this.ENROLLMENT_DB).pipe(delay(1000))
    }

    addEnrollment(): Observable<Enrollment[]> {
        this.ENROLLMENT_DB.push(
            {
                studentId: 'sssstj55',
                courseId: 'ssssw324va'
            }
        )

        return this.getEnrollments()
    }

}