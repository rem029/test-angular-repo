import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from '../__services/auth.service';
import { AuthModel } from '../__models/auth.model';
import {
  toggleShowPassword,
  onLoginError,
  onLoginSuccess,
  onLoading,
  onLoadingDone,
} from '../__actions/auth.action';
import { paths } from '../__paths/paths';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  paths = paths;

  email: string = '';
  password: string = '';
  authModel: AuthModel = {
    toggleShowPassword: false,
    isLoggedIn: false,
    isLoggedInError: false,
    isLoading: false,
    token: '',
    lastCode: 0,
  };
  formStatus = '';
  faSpinner = faSpinner;

  constructor(
    private store: Store<{ auth: AuthModel }>,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.store.select('auth').subscribe((value) => {
      this.authModel = value;
    });
  }

  ngOnInit(): void {
    if (this.authService.tokenCheck()) {
      this.router.navigateByUrl(paths.dashboard);
    }
  }

  onLogin() {
    this.formStatus = '';
    if (this.email.length > 0 && this.password.length > 0) {
      this.store.dispatch(onLoading());

      this.authService.login(this.email, this.password).subscribe(
        (response: any) => {
          this.store.dispatch(
            onLoginSuccess({
              authModel: {
                ...this.authModel,
                token: response.data.jwt,
                isLoggedIn: true,
                isLoggedInError: false,
                lastCode: response.code,
              },
            })
          );
          this.store.dispatch(onLoadingDone());
          this.authService.tokenSave(this.authModel.token);
          this.reload();
        },
        (error: any) => {
          this.store.dispatch(
            onLoginError({
              authModel: {
                ...this.authModel,
                token: '',
                isLoggedIn: true,
                isLoggedInError: true,
                lastCode: error.error.code,
              },
            })
          );
          this.store.dispatch(onLoadingDone());
          this.authService.tokenDelete();
        }
      );
    } else {
      this.formStatus = 'Please enter email and password.';
    }
  }

  toggleShowPassword(event: any) {
    this.store.dispatch(toggleShowPassword());
  }

  reload() {
    window.location.reload();
  }
}
