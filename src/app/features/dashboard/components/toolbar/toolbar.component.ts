import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/users';
import { AuthService } from '../../../../core/services/auth.service';
import { Store } from '@ngrx/store';
import { RootState } from '../../../../core/store';
import { selectAuthUser } from '../../../../core/store/auth/auth.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent{
    
  @Output() toggleSidebar = new EventEmitter();

  authUser$: Observable<User | null>;

  constructor(
    private authService: AuthService,
    private store: Store<RootState>

  ) {
    // this.authUser$ = this.authService.authUser$;
    this.authUser$ = this.store.select(selectAuthUser)

  }

}

