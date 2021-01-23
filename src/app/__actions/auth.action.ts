import { createAction, props } from '@ngrx/store';
import { AuthModel } from '../__models/auth.model';

export const toggleShowPassword = createAction('[AUTH Component] TOGGLE');

export const setLoggedIn = createAction(
  '[AUTH Component] Login Set',
  props<{ isLoggedIn: boolean }>()
);

export const onLoginSuccess = createAction(
  '[AUTH Component] Login Success',
  props<{ authModel: AuthModel }>()
);

export const onLoginError = createAction(
  '[AUTH Component] Login Error',
  props<{ authModel: AuthModel }>()
);

export const onLoading = createAction('[AUTH Component] onLoading');
export const onLoadingDone = createAction('[AUTH Component] onLoading Done');

export const resetAuthState = createAction('[AUTH Component] Reset Auth State');
