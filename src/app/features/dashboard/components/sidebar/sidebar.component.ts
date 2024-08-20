import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/users';
import { environment } from '../../../../../environments/environment';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../core/store';
import { selectAuthUser } from '../../../../core/store/auth/auth.selectors';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() openMenu:boolean = false;

  closeOnClick() {
    this.openMenu = false
  }
  
  authUser$: Observable<User | null>;
  nameEnv = environment.envName

  constructor(
    private authService: AuthService,
    private store: Store<RootState> 
  ) {
    // this.authUser$ = this.authService.authUser$;
    this.authUser$ = this.store.select(selectAuthUser)
  }

  logout() {
    this.authService.logout()
  }

}
