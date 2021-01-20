import { createReducer, on, Action } from '@ngrx/store';
import { toggle, get, set } from '../actions/sidebar.actions';

import { HeaderSideBarService } from '../header/header-sidebar-service';

export const initialState = new HeaderSideBarService().get();
const headerSideBarState = new HeaderSideBarService();

const _sideBarReducer = createReducer(
  initialState,
  on(toggle, (state) => {
    headerSideBarState.set(!state);
    return !state;
  }),
  on(get, (state) => state),
  on(set, (state, action) => {
    headerSideBarState.set(action.state);
    return action.state;
  })
);

export function sideBarReducer(state: any, action: Action) {
  return _sideBarReducer(state, action);
}
