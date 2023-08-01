import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  emailControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.email]);
  passwordControl = new FormControl<string | null>(null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]);

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
  });

  constructor() {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
    }
  }


}
