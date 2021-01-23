import { createAction, props } from '@ngrx/store';
import { DashboardModel } from '../__models/dashboard.model';

export const setCurrentUser = createAction(
  '[Dashboard Component] SET CURRENT USER',
  props<{ dashBoardModel: DashboardModel }>()
);
