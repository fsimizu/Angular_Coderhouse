import { Component, OnInit } from '@angular/core';
import { Course } from '../../../shared/models/course.model';
import { MatDialog } from '@angular/material/dialog';
import { CoursesService } from '../../../core/services/courses.service';
import { RegisterCourseComponent } from './components/register-course/register-course.component';
import { generateId } from '../../../shared/utils';
import { DeleteCourseComponent } from './components/delete-course/delete-course.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'courseName', 'courseDescription', 'actions'];

  courses: Course[] = []
  isLoading = false

  constructor(
    private matDialog: MatDialog,
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
      error: () => {
        this.isLoading = false
        console.log("error loading the courses")
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  openDialog(): void {
    this.matDialog
      .open(RegisterCourseComponent)
      .afterClosed()
      .subscribe({
        next: (value) => {
          value['id'] = generateId(4);
          this.isLoading = true;
          this.coursesService.addCourse(value).subscribe({
            next: (courses) => {
              this.courses = [...courses];
            },
            complete: () => {
              this.isLoading = false
            }
          })
        },
      });
  }

  editCourse(editingCourse: Course) {
    this.matDialog
      .open(RegisterCourseComponent, { data: editingCourse })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.isLoading = true;
            this.coursesService.editCourse(editingCourse.id, value).subscribe({
              next: (courses) => {
                this.courses = [...courses];
              },
              error: () => {
                this.isLoading = false
                console.log("error editing the course")
              },
              complete: () => {
                this.isLoading = false
              }
            })
          }
        },
      });
  }

  deleteCourseById(id: string) {
    this.matDialog
      .open(DeleteCourseComponent)
      .afterClosed()
      .subscribe({
        next: (answer) => {
          if (answer) {
            this.isLoading = true;
            this.coursesService.deleteCourseById(id).subscribe({
              next: (courses) => {
                this.courses = [...courses];
              },
              error: () => {
                this.isLoading = false
                console.log("error deleting the course")
              },
              complete: () => {
                this.isLoading = false
              }
            })
          }
        },
      });
  }


}
