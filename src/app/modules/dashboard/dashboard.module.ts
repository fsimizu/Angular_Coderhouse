import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { StudentsContainerModule } from './students-container/students-container.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],

  exports: [
    DashboardComponent   
  ],

  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule, 
    MatFormFieldModule,
    MatInputModule,
    MatNavList,
    MatListModule,
    StudentsContainerModule,
    MatSlideToggleModule, 
    
  ]
})
export class DashboardModule { 
}
