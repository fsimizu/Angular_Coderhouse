import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { UsersActions } from './users.actions';
import { UsersService } from '../../../../core/services/users.service';
import { NotifierService } from '../../../../core/services/notifier.service';
import { Router } from '@angular/router';

@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      concatMap(() =>
        this.usersService.getUsers()
          .pipe(
            map(data => UsersActions.loadUsersSuccess({ data })),
            catchError(error => of(UsersActions.loadUsersFailure({ error }))))
      )
    );
  });

  addUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.addUsers),
      concatMap((action) =>
        this.usersService.addUsers(action.newUser)
          .pipe(
            map((user) => UsersActions.addUsersSuccess({ data: user })),
            tap(()=>{
              this.notifier.sendNotification('User created successfully', 'success');
              this.router.navigate(['/login']);
            }),
            catchError(error => of(UsersActions.addUsersFailure({ error })))
          ))
    );
  });

  deleteUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.deleteUsers),
      concatMap((action) =>
        this.usersService.deleteUserById(action.id)
          .pipe(
            map((data) => UsersActions.deleteUsersSuccess({ data })),
            catchError(error => of(UsersActions.deleteUsersFailure({ error })))
          ))
    );
  });

  editUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsersActions.editUsers),
      concatMap((action) => {
        return this.usersService.editUsers(action.id, action.editedUser)
          .pipe(
            map((data) => UsersActions.editUsersSuccess({ data })),
            catchError(error => of(UsersActions.editUsersFailure({ error }))))
      })
    );
  });

  constructor(
    private actions$: Actions,
    private usersService: UsersService,
    private notifier: NotifierService,
    private router: Router,
  ) { }
}
