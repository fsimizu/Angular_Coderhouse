import { Component } from '@angular/core';
import { CoursesService } from '../../../../../core/services/courses.service';
import { finalize, Observable } from 'rxjs';
import { Course } from '../../../../../shared/models/course.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})

export class CourseDetailsComponent {

  course$: Observable<Course | undefined>
  isLoading = false

  constructor( 
    private courseService: CoursesService, 
    private activatedRoute: ActivatedRoute,
    private location: Location
  )
  {
    this.isLoading = true;
    this.course$ = this.courseService.getStudentById(this.activatedRoute.snapshot.params['id'])
    .pipe(finalize(() => this.isLoading = false))
  }

  goBack(): void {
    this.location.back();
  }

}
