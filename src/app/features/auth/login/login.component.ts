import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Invalid form')
    } else {
      const credentials = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value,
      }
      this.authService.login(credentials);
    }

  }

  get emailControl() {
    return this.loginForm.get('email');
  }
  get passwordControl() {
    return this.loginForm.get('password');
  }


}
