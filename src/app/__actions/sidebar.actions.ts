import { createAction, props } from '@ngrx/store';

export const toggle = createAction('[SideBar Component] TOGGLE');
export const get = createAction('[SideBar Component] GET');
export const set = createAction(
  '[SideBar Component] SET',
  props<{ state: boolean }>()
);
