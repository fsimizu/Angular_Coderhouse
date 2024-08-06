import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../../../core/services/auth.service';
import { UsersService } from '../../../core/services/users.service';
import { User } from '../../../shared/models/users';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'actions'];
  
  users: User[] = []
  isLoading = false

  authUser$: Observable<User | null>;
  
  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.authUser$;
  }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users
      },
      error: () => {
        this.isLoading = false
        console.log("error loading the users")
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  editUser(editingUser: User) {
    this.matDialog
      .open(RegisterUserComponent, { data: editingUser })
      .afterClosed()
      .subscribe({
        next: (value) => {
          
          
          if (!!value) {
            this.isLoading = true;
            this.usersService
            .editUsers(editingUser.id, value)
              .subscribe({
                next: () => {
                  this.getUsers();
                },
              error: (error) => {
                if (error instanceof HttpErrorResponse) {
                  alert('error editing the student');
                  this.isLoading = false   
                  if (error.status === 404) {
                    console.log('error editing the student'); 
                  }
                }
              },
              complete: () => {
                this.isLoading = false
              }
            })
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
            this.isLoading = true;
            this.usersService
            .deleteUserById(id)
            .subscribe({
              next: () => {
                this.getUsers();
              },
              error: (error) => {
                if (error instanceof HttpErrorResponse) {
                  alert('error deleting the user');
                  this.isLoading = false    
                  if (error.status === 404) {
                    alert('error 404');
                  }
                }
              },
              complete: () => {
                this.isLoading = false
              }
            })
          }
        },
      });
  }

}
