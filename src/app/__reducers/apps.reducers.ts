import { createReducer, on, Action } from '@ngrx/store';
import {
  appsNextPage,
  appsPrevPage,
  setApps,
  setLoading,
} from '../__actions/apps.action';
import { AppsModel } from '../__models/apps.model';

const initialState: AppsModel = {
  apps: [],
  lastCode: 0,
  isLoading: false,
  _meta: {
    page: 0,
    per_page: 0,
    total_items: 0,
    total_pages: 0,
  },
};

const _appsReducer = createReducer(
  initialState,
  on(setApps, (state, action) => {
    return Object.assign({}, state, {
      ...action.apps,
    });
  }),
  on(appsNextPage, (state) => {
    return Object.assign({}, state, {
      ...state,
      _meta: { ...state._meta, page: state._meta.page + 1 },
    });
  }),
  on(appsPrevPage, (state) => {
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

export function appsReducer(state: any, action: Action) {
  return _appsReducer(state, action);
}
