import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatNavList } from '@angular/material/list';
import { SharedModule } from '../../shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

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
    SharedModule,
    MatNavList,
  ]
})
export class DashboardModule { 
}
