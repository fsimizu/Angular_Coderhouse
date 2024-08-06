import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from '../../../core/services/notifier.service';
import { UsersService } from '../../../core/services/users.service';

function generateId(length: number) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private notifier: NotifierService
  ) {

    this.registerForm = this.fb.group({
      firstName: ['name', Validators.required],
      lastName: ['last', Validators.required],
      email: ['test@test.com', [Validators.required, Validators.email]],
      role: ['user'],
      password: ['1234', Validators.required],
      token: [generateId(20)]
    })

  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;

      this.usersService
      .addUsers(newUser)
      .subscribe({
        next: () => {
          this.notifier.sendNotification('User created successfully', 'success');
        },
        error: (error) => {
          console.error('Error creating user', error);
        },
        complete: () => {
          this.router.navigate(['/login']);
        }
      }
      );
    }
  };

  get firstNameControl() {
    return this.registerForm.get('firstName');
  }
  get lastNameControl() {
    return this.registerForm.get('lastName');
  }

  get emailControl() {
    return this.registerForm.get('email');
  }
  get passwordControl() {
    return this.registerForm.get('password');
  }


}
