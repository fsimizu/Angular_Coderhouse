import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../../shared/models/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private VALID_TOKEN = 'asdg43wga43gw34f44h';
  private FAKE_USER: User = {
    id: '2364t34f',
    email: 'asd@test.com',
    role: 'Admin'
  }
  private _authUser$ = new BehaviorSubject<User | null>(null);

  authUser$ = this._authUser$.asObservable()


  constructor(private router: Router) {}  

  login(){
    this._authUser$.next(this.FAKE_USER);
    localStorage.setItem('token', this.VALID_TOKEN);
    this.router.navigate(['dashboard', 'home'])
  }

  
  logout(){
    localStorage.removeItem('token')
    this._authUser$.next(null);
    this.router.navigate(['auth', ''])
  }

  verifyUser(): Observable<User | null> {
    const token = localStorage.getItem('token');
    if (token) {
      this._authUser$.next(this.FAKE_USER);
    } 
    return this._authUser$
  }

  verifyToken(): Observable<boolean>{
    const token = localStorage.getItem('token');
    const isValid = this.VALID_TOKEN === token;
    if (isValid) {
      this._authUser$.next(this.FAKE_USER);
    }
    return of(isValid)
  }

  getUser(){}
  
}
