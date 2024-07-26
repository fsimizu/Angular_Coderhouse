import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../../core/services/courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'courseName', 'courseDescription'];

  courses: Course[] = []
  isLoading = false


  constructor(
    // private matDialog: MatDialog,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {
    this.getCourses()    
  }

  getCourses() {
    this.isLoading = true;
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses        
      },
      error: () => {}, //Aca habria que mostrar  algun error
      complete: () => {
        this.isLoading = false;
      }
    })
  }

}
