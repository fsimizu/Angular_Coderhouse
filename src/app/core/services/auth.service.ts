import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { User } from '../../shared/models/users';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotifierService } from './notifier.service';
import { Store } from '@ngrx/store';
import { RootState } from '../store';
import { setAuthUser, unsetAuthUser } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // private _authUser$ = new BehaviorSubject<User | null>(null);
  // authUser$ = this._authUser$.asObservable()

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifier: NotifierService,
    private store: Store<RootState>
  ) { }

  login(credentials: { email: string, password: string }) {
    this.http.get<User[]>(environment.apiUrl + '/users', {
      params: {
        email: credentials.email,
        // password: credentials.password,
      }
    })
      .subscribe({
        next: (response) => {
          if (!response.length || response[0].password !== credentials.password ) {
            this.notifier.sendNotification('User or password invalid', 'warning');
          }
          else {
            const authUser = response[0];
            localStorage.setItem('token', authUser.token);
            this.store.dispatch(setAuthUser({payload: authUser}))
            // this._authUser$.next(authUser);
            this.router.navigate(['dashboard', 'home'])

          }
        },
        error: (err) => {
          this.notifier.sendNotification('Server error. Please contact IT', 'warning');
          console.log(err);
        }

      })
  }

  logout() {
    localStorage.removeItem('token')
    this.store.dispatch(unsetAuthUser())
    // this._authUser$.next(null);
    this.router.navigate(['auth', ''])
  }

  verifyToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      return of(false)
    }
    return this.http.get<User[]>(environment.apiUrl + '/users', {
      params: {
        token: token,
      }
    }).pipe(
      map((response) => {
        if (!response.length) {
          return false;
        } else {
          const authUser = response[0];
          localStorage.setItem('token', authUser.token);
          this.store.dispatch(setAuthUser({payload: authUser}))
          // this._authUser$.next(authUser);
          return true
        }
      })
    )
  }

}
