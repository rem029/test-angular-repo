import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { AuthService } from '../__services/auth.service';
import { LogInAuthModel } from '../__models/login-auth.model';
import {
  toggleShowPassword,
  onLoginError,
  onLoginSuccess,
} from '../__actions/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  email: string = '';
  password: string = '';
  logInModel: LogInAuthModel = {
    toggleShowPassword: false,
    isLoggedIn: false,
    isLoggedInError: false,
    token: '',
    lastCode: 0,
  };
  formStatus = '';

  constructor(
    private store: Store<{ loginShowPassword: LogInAuthModel }>,
    private http: HttpClient,
    private loginAuthService: AuthService
  ) {
    this.store.select('loginShowPassword').subscribe((value) => {
      this.logInModel = value;
    });
  }

  ngOnInit(): void {}

  onLogin() {
    this.formStatus = '';
    if (this.email.length > 0 && this.password.length > 0) {
      this.loginAuthService.login(this.email, this.password).subscribe(
        (response: any) => {
          this.store.dispatch(
            onLoginSuccess({
              logInAuthModel: {
                ...this.logInModel,
                token: response.data.jwt,
                isLoggedIn: true,
                isLoggedInError: false,
                lastCode: response.code,
              },
            })
          );

          this.loginAuthService.tokenSave(this.logInModel.token);
        },
        (error: any) => {
          this.store.dispatch(
            onLoginError({
              logInAuthModel: {
                ...this.logInModel,
                token: '',
                isLoggedIn: true,
                isLoggedInError: true,
                lastCode: error.error.code,
              },
            })
          );
          this.loginAuthService.tokenDelete();
        }
      );
    } else {
      this.formStatus = 'Please enter email and password.';
    }
  }

  toggleShowPassword(event: any) {
    this.store.dispatch(toggleShowPassword());
  }
}
