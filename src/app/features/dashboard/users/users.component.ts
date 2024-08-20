import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootState } from '../../../core/store';
import { User } from '../../../shared/models/users';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { UsersActions } from './store/users.actions';
import { selectUsers, selectUsersError, selectUsersIsLoading } from './store/users.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  users$: Observable<User[]>;
  isLoadingUsers$: Observable<boolean>;
  error$: Observable<unknown>
  
  constructor(
    private matDialog: MatDialog,
    private store: Store<RootState>
  ) {
    this.users$ = this.store.select(selectUsers);
    this.isLoadingUsers$ = this.store.select(selectUsersIsLoading);
    this.error$ = this.store.select(selectUsersError)
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers())
  }

  editUser(editingUser: User) {
    this.matDialog
      .open(RegisterUserComponent, { data: editingUser })
      .afterClosed()
      .subscribe({
        next: (value) => {
          if (!!value) {
            this.store.dispatch(UsersActions.editUsers({id: editingUser.id, editedUser: value}))
          }
        },
      });
  }

  deleteUserById(id: string) {
    this.matDialog
      .open(DeleteUserComponent)
      .afterClosed()
      .subscribe({
        next: (answer) => {
          if (answer) {
            this.store.dispatch(UsersActions.deleteUsers({ id }))
          }
        },
      });
  }

}
