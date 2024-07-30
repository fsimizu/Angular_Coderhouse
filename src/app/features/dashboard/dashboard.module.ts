import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { SharedModule } from '../../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { EnrollementsModule } from './enrollements/enrollements.module';
import { StudentsContainerModule } from './students-container/students-container.module';

@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    ToolbarComponent,
  ],

  exports: [
    DashboardComponent,
  ],

  imports: [
    CommonModule,
    DashboardRoutingModule,
    StudentsContainerModule,
    EnrollementsModule,
    SharedModule,
    MatNavList,
  ]
})
export class DashboardModule { 
}
