import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { UsersService } from '../../../../../core/services/users.service';
import { User } from '../../../../../shared/models/users';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  user$: Observable<User | undefined>;
  isLoading = false

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    this.isLoading = true;
    this.user$ = this.usersService.getUserById(this.activatedRoute.snapshot.params['id'])
    .pipe(finalize(() => this.isLoading = false)) 
  }

  goBack(): void {
    this.location.back();
  }


}