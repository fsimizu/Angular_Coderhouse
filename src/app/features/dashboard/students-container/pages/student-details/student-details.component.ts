import { Component } from '@angular/core';
import { StudentsService } from '../../../../../core/services/students.service';
import { Observable } from 'rxjs';
import { Student } from '../../../../../models/student.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent {

  student$: Observable<Student | undefined>

  constructor( private studentService: StudentsService, private activatedRoute: ActivatedRoute){
    this.student$ = this.studentService.getStudentById(this.activatedRoute.snapshot.params['id'])
  }
}
