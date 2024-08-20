import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardRoutingModule } from '../features/dashboard/dashboard-routing.module';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { HeadersDirective } from './directives/headers.directive';
import { FullNamePipe } from './pipes/full-name.pipe';

@NgModule({
  declarations: [
    FullNamePipe,
    HeadersDirective,
    ClickOutsideDirective
  ],
  exports: [
    FullNamePipe,
    HeadersDirective,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormsModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatSlideToggleModule,  
    MatDatepickerModule,
    MatTableModule,
    MatSelectModule,
    DashboardRoutingModule,
    MatProgressBarModule,
    MatCardModule,
    ClickOutsideDirective
  ],
  imports: [
    CommonModule,
  ]
})
export class SharedModule { }
