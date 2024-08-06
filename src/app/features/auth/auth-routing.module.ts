import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module')
    .then((ref) => ref.LoginModule),
  
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module')
    .then((ref) => ref.RegisterModule),
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
