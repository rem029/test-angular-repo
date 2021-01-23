import { createReducer, on, Action } from '@ngrx/store';
import {
  usersNextPage,
  usersPrevPage,
  setUsers,
  setLoading,
} from '../__actions/users.actions';
import { UsersModel } from '../__models/users.model';

const initialState: UsersModel = {
  lastCode: 0,
  isLoading: false,
  users: [],
  _meta: {
    page: 1,
    per_page: 10,
    total_items: 0,
    total_pages: 1,
  },
};

const _usersReducer = createReducer(
  initialState,
  on(setUsers, (state, action) => {
    return Object.assign({}, state, {
      ...action.users,
    });
  }),
  on(usersNextPage, (state) => {
    return Object.assign({}, state, {
      ...state,
      _meta: { ...state._meta, page: state._meta.page + 1 },
    });
  }),
  on(usersPrevPage, (state) => {
    return Object.assign({}, state, {
      ...state,
      _meta: { ...state._meta, page: state._meta.page - 1 },
    });
  }),
  on(setLoading, (state, action) => {
    return Object.assign({}, state, {
      ...state,
      isLoading: action.isLoading,
    });
  })
);

export function usersReducer(state: any, action: Action) {
  return _usersReducer(state, action);
}
