import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, forkJoin, mergeMap, Observable, of } from 'rxjs';
import { CoursesService } from '../../../../../core/services/courses.service';
import { EnrollmentsService } from '../../../../../core/services/enrollments.service';
import { StudentsService } from '../../../../../core/services/students.service';
import { Course } from '../../../../../shared/models/course.model';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})

export class CourseDetailsComponent {

  course$: Observable<Course | undefined>
  students$: Observable<any | undefined> = of(undefined)
  isLoading = false

  constructor(
    private courseService: CoursesService,
    private enrollmentsService: EnrollmentsService,
    private studentsService: StudentsService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.isLoading = true;
    this.course$ = this.courseService
      .getCourseById(this.activatedRoute.snapshot.params['id'])
      .pipe(finalize(() => this.isLoading = false));

    this.students$ = this.enrollmentsService
    .getEnrollmentsByCourse(this.activatedRoute.snapshot.params['id'])
    .pipe(
      mergeMap((enrollments: any) => {
        const studentIds = enrollments.map((enrollment: any) => enrollment.studentId);  
        return forkJoin(
          studentIds.map((studentId: string) =>
            this.studentsService.getStudentById(studentId)
            .pipe(
              catchError((error: string) => {
                console.error('Error fetching student:', error);
                return of(null);
              })
            )
          )
        )
      })
    );
  }

  goBack(): void {
    this.location.back();
  }

}
