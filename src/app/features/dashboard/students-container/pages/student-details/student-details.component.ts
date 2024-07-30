import { Component } from '@angular/core';
import { StudentsService } from '../../../../../core/services/students.service';
import { finalize, Observable } from 'rxjs';
import { Student } from '../../../../../shared/models/student.model';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent {

  student$: Observable<Student | undefined>;
  isLoading = false

  constructor(
    private studentService: StudentsService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.isLoading = true;
    this.student$ = this.studentService.getStudentById(this.activatedRoute.snapshot.params['id'])
    .pipe(finalize(() => this.isLoading = false)) 
  }

  goBack(): void {
    this.location.back();
  }


}
