import { createAction, props } from '@ngrx/store';
import { LogInAuthModel } from '../login/login-auth.model';

export const toggleShowPassword = createAction(
  '[LoginPassword Component] TOGGLE'
);

export const onLoginSuccess = createAction(
  '[LoginPassword Component] TokenSave',
  props<{ logInAuthModel: LogInAuthModel }>()
);

export const onLoginError = createAction(
  '[LoginPassword Component] TokenSave',
  props<{ logInAuthModel: LogInAuthModel }>()
);
