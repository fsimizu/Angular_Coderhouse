import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { NotifierService } from '../../../core/services/notifier.service';
import { RootState } from '../../../core/store';
import { Course } from '../../../shared/models/course.model';
import { Student } from '../../../shared/models/student.model';
import { EnrollmentsActions } from './store/enrollments.actions';
import { selectEnrollmentsCourses, selectEnrollmentsStudents } from './store/enrollments.selectors';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit {
  enrollmentsForm: FormGroup;
  isLoading = true;
  students$: Observable<Student[]>;
  courses$: Observable<Course[]>

  constructor(
    private fb: FormBuilder,
    private notifier: NotifierService,
    private store: Store<RootState>
  ) {
    this.enrollmentsForm = this.fb.group({
      courseId: [null, Validators.required],
      studentId: [null, Validators.required],
    });
    this.students$ = this.store.select(selectEnrollmentsStudents);
    this.courses$ = this.store.select(selectEnrollmentsCourses);
  }

  ngOnInit(): void {
    this.store.dispatch(EnrollmentsActions.loadStudentsAndCourses())
  }

  onSubmit(): void {
    if (this.enrollmentsForm.valid) {
      this.store.dispatch(EnrollmentsActions.createEnrollment({
        payload: {
          id: undefined,
          studentId: this.enrollmentsForm.get('studentId')?.value,
          courseId: this.enrollmentsForm.get('courseId')?.value,
        }
      }))    
      
    } else {
      this.notifier.sendNotification("Invalid form", "warning")
    }
  }

  resetForm() {
    this.enrollmentsForm.reset();
  }

}
