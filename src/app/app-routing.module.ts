import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { CoursesComponent } from './features/dashboard/courses/courses.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { HomeComponent } from './features/dashboard/home/home.component';
import { StudentDetailsComponent } from './features/dashboard/students-container/pages/student-details/student-details.component';
import { StudentsContainerComponent } from './features/dashboard/students-container/students-container.component';

const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'students/:id',
        component: StudentDetailsComponent
      },
      {
        path: 'students',
        component: StudentsContainerComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
