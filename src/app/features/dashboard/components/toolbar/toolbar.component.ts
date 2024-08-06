import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/users';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent{
    
  @Output() toggleSidebar = new EventEmitter();

  authUser$: Observable<User | null>;

  constructor(private authService: AuthService) {
    this.authUser$ = this.authService.authUser$;
  }

}

