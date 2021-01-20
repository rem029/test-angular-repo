import { createReducer, on, Action } from '@ngrx/store';
import { toggleShowPassword } from '../actions/login.action';

export const initialState = false;

const _loginReducer = createReducer(
  initialState,
  on(toggleShowPassword, (state) => {
    return !state;
  })
);

export function loginReducer(state: any, action: Action) {
  return _loginReducer(state, action);
}
