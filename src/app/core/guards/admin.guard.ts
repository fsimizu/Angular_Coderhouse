import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/auth/auth.selectors';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);
  const store = inject(Store);

  // return authService.authUser$.pipe(
  return store.select(selectAuthUser)
  .pipe(
    map((authUser)=> 
      authUser?.role !== 'admin' 
        ? router.createUrlTree(['dashboard', 'home'])
        : true
    )
  );
};
