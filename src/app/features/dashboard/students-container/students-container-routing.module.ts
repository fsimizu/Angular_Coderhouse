import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsContainerComponent } from './students-container.component';
import { StudentDetailsComponent } from './pages/student-details/student-details.component';

const routes: Routes = [
  {
    path: '',
    component: StudentsContainerComponent
  },
  {
    path: ':id',
    component: StudentDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsContainerRoutingModule { }
