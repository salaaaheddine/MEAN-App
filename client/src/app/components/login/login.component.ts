import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form !: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    })
  }



  onSubmit(): void {
    console.log("Submitted")
    this.auth.login(this.form.getRawValue())
  }

  getEmailErrorMessage(): string {
    if (this.form.get('email')!.errors!['required'])
      return 'Email is required.'
    else if (this.form.get('email')!.errors!['email'])
      return 'Invalid email format.';
    return ""
  }
  getPasswordErrorMessage() {
    if (this.form.get('password')!.errors!['required'])
      return 'Password is required.'
    else if (this.form.get('password')!.errors!['minlength'])
      return 'at least 4 characters long.'
    return ''
  }

}
