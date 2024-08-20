import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RootState } from '../../../core/store';
import { UsersActions } from '../../dashboard/users/store/users.actions';

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
    private store: Store<RootState>

  ) {

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['user'],
      password: ['', Validators.required],
      token: [generateId(20)]
    })

  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;
      this.store.dispatch(UsersActions.addUsers({ newUser }))
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
