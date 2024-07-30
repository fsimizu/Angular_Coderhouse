import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { adminGuard } from '../../core/guards/admin.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'courses',
    canActivate: [adminGuard],
    loadChildren: () => import('./courses/courses.module')
      .then((ref) => ref.CoursesModule),
  },
  {
    path: 'students',
    loadChildren: () => import('./students-container/students-container.module')
      .then((ref) => ref.StudentsContainerModule)
  },

  // {
  //   path: '/',
  //   redirectTo: 'home'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
