import { createReducer, on, Action } from '@ngrx/store';

import { DashboardModel } from '../__models/dashboard.model';
import { UserModel } from '../__models/user.model';
import { AppModel } from '../__models/app.model';

import { setCurrentUser } from '../__actions/dashboard.action';

export const initialState: DashboardModel = {
  currentUser: { id: 0, email: '', apps: [] },
  lastCode: 0,
};

const _dashboardReducer = createReducer(
  initialState,
  on(setCurrentUser, (state, action) => {
    return Object.assign({}, state, {
      ...action.dashBoardModel,
    });
  })
);

export function dashboardReducer(state: any, action: Action) {
  return _dashboardReducer(state, action);
}
