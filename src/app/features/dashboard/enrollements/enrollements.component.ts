import { Component } from '@angular/core';
import { EnrollementsService } from '../../../core/services/enrollments.service';
import { finalize, Observable } from 'rxjs';
import { Enrollment } from '../../../shared/models/enrollment.model';


@Component({
  selector: 'app-enrollements',
  templateUrl: './enrollements.component.html',
  styleUrl: './enrollements.component.scss'
})
export class EnrollementsComponent {

  isLoading = true;
  // enrollments$: Observable<Enrollment[]>
  enrollments: Enrollment[] = []

  constructor(private enrollmentsService: EnrollementsService) {
    // this.enrollments$ = this.enrollmentsService.getEnrollments().pipe(finalize(()=>{
    //   this.isLoading = false
    // }))
    this.enrollmentsService.getEnrollments().subscribe({
      next: (value) => this.enrollments = value,
      complete: () => this.isLoading = false
    })
  }
}
