import { createAction, props } from '@ngrx/store';
import { AppsModel } from '../__models/apps.model';

export const appsNextPage = createAction('[APPS COMPONENT] NEXT PAGE');
export const appsPrevPage = createAction('[APPS COMPONENT] PREVIOUS PAGE');
export const setApps = createAction(
  '[APPS COMPONENT] SET APPS',
  props<{ apps: AppsModel }>()
);
export const setLoading = createAction(
  '[APPS COMPONENT] SET LOADING',
  props<{ isLoading: boolean }>()
);
