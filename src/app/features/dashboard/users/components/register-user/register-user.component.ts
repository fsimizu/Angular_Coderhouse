import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../../shared/models/users';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.scss'
})
export class RegisterUserComponent {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<RegisterUserComponent>,
    @Inject(MAT_DIALOG_DATA) public editingUser?: User
  ) {
    
    this.userForm = this.fb.group({
      firstName: [null, [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z _]+$')
      ]],
      lastName: [null, [
        Validators.required, 
        Validators.minLength(3),
        Validators.pattern('^[a-zA-Z _]+$')
      ]],
      email: [null, [ 
        Validators.required,
        Validators.minLength(3)
      ]],
      role: [null],
      password: [null],
      token: [null]

    });
        
    if (this.editingUser) {
      console.log(this.userForm);
      this.userForm.patchValue(this.editingUser);
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.matDialogRef.close(this.userForm.value);
      // alert("all good!")
    } else {
      /// mostar error
    }
  }

  get firstNameControl() {
    return this.userForm.get('firstName');
  }
  get lastNameControl() {
    return this.userForm.get('lastName');
  }
  get emailControl() {
    return this.userForm.get('email');
  }

}
