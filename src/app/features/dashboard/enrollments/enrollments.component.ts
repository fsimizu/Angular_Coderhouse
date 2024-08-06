import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../../core/services/courses.service';
import { EnrollmentsService } from '../../../core/services/enrollments.service';
import { NotifierService } from '../../../core/services/notifier.service';
import { StudentsService } from '../../../core/services/students.service';
import { Course } from '../../../shared/models/course.model';
import { Enrollment } from '../../../shared/models/enrollment.model';
import { Student } from '../../../shared/models/student.model';


@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrl: './enrollments.component.scss'
})
export class EnrollmentsComponent implements OnInit{

  enrollmentsForm: FormGroup;
  isLoading = true;
  students: Student[] = [];
  filteredStudents: Student[] = [];
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  enrollments: Enrollment[] = [];

  constructor(
    private fb: FormBuilder,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
    private notifier: NotifierService
  ) {

    this.enrollmentsForm = this.fb.group({
      courseId: [null, Validators.required],
      studentId: [null, Validators.required],
    });
    
  }


  ngOnInit(): void {
    this.getStudents(),
    this.getCourses()
        
  }
  
  filterCourses(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredCourses = this.courses.filter(course => course.courseName.toLowerCase().includes(searchValue));
  }
  filterStudents(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredStudents = this.students.filter(student => student.lastName.toLowerCase().includes(searchValue));
  }


  getStudents() {
    this.isLoading = true;
    this.studentsService.getStudents().subscribe({
      next: (students) => {
        this.students = students
      },
      error: () => {
        this.isLoading = false
        console.log("error loading the students")
      },
      complete: () => {
        this.isLoading = false;
        this.filteredStudents = this.students;
      }
    })
  };

  getCourses() {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses
      },
      error: () => {
        this.isLoading = false
        console.log("error loading the courses")
      },
      complete: () => {
        this.isLoading = false;
        this.filteredCourses = this.courses;
        
      }
    })
  }

  onSubmit(): void {
    if (this.enrollmentsForm.valid) {
      const newEnrollment = this.enrollmentsForm.value;
   
      this.enrollmentsService
      .addEnrollment(newEnrollment)
      .subscribe({
        next: () => {
          this.notifier.sendNotification('User enrolled successfully', 'success');
          this.enrollmentsForm.reset();
        },
        error: (error) => {
          console.error('Error enrolling the student ', error);
          this.notifier.sendNotification('Enrollment failed: ' + error.message, 'error');
        }
      })
    } else {

      /// mostar error
      alert('ko')
    }
  }

  resetForm() {
    this.enrollmentsForm.reset();
  }

}
