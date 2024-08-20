import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UsersEffects } from './store/users.effects';
import { UsersFeature } from './store/users.reducer';

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
    EffectsModule.forFeature([UsersEffects]),
    StoreModule.forFeature(UsersFeature),
  ],
})
export class UsersModule { }
