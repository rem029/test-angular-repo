import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { LoginAuthService } from './login-auth.service';
import { toggleShowPassword } from '../actions/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  constructor(
    private store: Store<{ loginShowPassword: boolean }>,
    private http: HttpClient,
    private loginAuthService: LoginAuthService
  ) {
    this.store.select('loginShowPassword').subscribe((value) => {
      this.showPassword = value;
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.email.length > 0 && this.password.length > 0) {
      console.log('email', this.email);
      console.log('password', this.password);

      this.loginAuthService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('LOGIN RESPONSE', response);

          // ...SAVE TOKEN IN COOKIE
        },
        (error) => {
          console.log('LOGIN ERROR', error);

          // ...SHOW ERROR MSG IN UI TOKEN IN COOKIE
        }
      );
    }
  }

  toggleShowPassword(event: any) {
    this.store.dispatch(toggleShowPassword());
  }
}
