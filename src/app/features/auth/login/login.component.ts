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
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['1234', Validators.required],
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
