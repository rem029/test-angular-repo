import { createReducer, on, Action } from '@ngrx/store';

import {
  onLoginSuccess,
  onLoginError,
  toggleShowPassword,
  onLoading,
  onLoadingDone,
  setLoggedIn,
  resetAuthState,
} from '../__actions/auth.action';
import { AuthModel } from '../__models/auth.model';

export const initialState: AuthModel = {
  toggleShowPassword: false,
  isLoggedIn: false,
  isLoggedInError: false,
  isLoading: false,
  token: '',
  lastCode: 0,
};

const _authReducer = createReducer(
  initialState,
  on(toggleShowPassword, (state) => {
    return Object.assign({}, state, {
      toggleShowPassword: !state.toggleShowPassword,
    });
  }),
  on(onLoginSuccess, (state, action) => {
    return Object.assign({}, state, {
      ...action.authModel,
    });
  }),
  on(onLoginError, (state, action) => {
    return Object.assign({}, state, {
      ...action.authModel,
    });
  }),
  on(onLoading, (state) => {
    return Object.assign({}, state, {
      isLoading: true,
    });
  }),
  on(onLoadingDone, (state) => {
    return Object.assign({}, state, {
      isLoading: false,
    });
  }),
  on(setLoggedIn, (state, action) => {
    return Object.assign({}, state, {
      isLoggedIn: action.isLoggedIn,
    });
  }),
  on(resetAuthState, (state) => {
    console.log('RESET STATE', state);
    return Object.assign({}, state, { ...initialState });
  })
);

export function authReducer(state: any, action: Action) {
  console.log('AUTH REDUCER', state);
  return _authReducer(state, action);
}
