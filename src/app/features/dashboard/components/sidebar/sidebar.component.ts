import { Component, Input } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/users';
import { environment } from '../../../../../environments/environment';

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

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }

  logout() {
    this.authService.logout()
  }

}
