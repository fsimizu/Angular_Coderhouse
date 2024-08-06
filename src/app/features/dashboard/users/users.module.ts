import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';

@NgModule({
  declarations: [
    UsersComponent,
    DeleteUserComponent,
    RegisterUserComponent,
    UserDetailsComponent 

  ],
  exports: [
    UsersComponent,
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    SharedModule,
  ],
})
export class UsersModule { }
