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

  constructor(private authService: AuthService, private fb: FormBuilder) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })

    // this.authService.login()
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      // alert('invalido')

    } else {
      this.authService.login();
    }

  }

}
