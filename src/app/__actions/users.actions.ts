import { createAction, props } from '@ngrx/store';
import { UsersModel } from '../__models/users.model';

export const usersNextPage = createAction('[USERS COMPONENT] NEXT PAGE');
export const usersPrevPage = createAction('[USERS COMPONENT] PREVIOUS PAGE');
export const setUsers = createAction(
  '[USERS COMPONENT] SET USERS',
  props<{ users: UsersModel }>()
);
export const setLoading = createAction(
  '[USERS COMPONENT] SET LOADING',
  props<{ isLoading: boolean }>()
);
