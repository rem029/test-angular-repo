import { createReducer, on, Action } from '@ngrx/store';

import {
  onLoginError,
  onLoginSuccess,
  toggleShowPassword,
} from '../__actions/login.action';
import { LogInAuthModel } from '../__models/login-auth.model';

export const initialState: LogInAuthModel = {
  toggleShowPassword: false,
  isLoggedIn: false,
  isLoggedInError: false,
  token: '',
  lastCode: 0,
};

const _loginReducer = createReducer(
  initialState,
  on(toggleShowPassword, (state) => {
    return Object.assign({}, state, {
      toggleShowPassword: !state.toggleShowPassword,
    });
  }),
  on(onLoginSuccess, (state, action) => {
    return Object.assign({}, state, {
      ...action.logInAuthModel,
    });
  }),
  on(onLoginError, (state, action) => {
    return Object.assign({}, state, {
      ...action.logInAuthModel,
    });
  })
);

export function loginReducer(state: any, action: Action) {
  return _loginReducer(state, action);
}
