import { createAction, props } from '@ngrx/store';
import { User } from './auth.reducer';


export const loadLoginSuccess = createAction(
  '[Auth] Load Login Success',
  props<{ user: User }>()
);

export const loadLoginFailure = createAction(
  '[Auth] Load Login Failure',
  props<{ error: any }>()
);

export const loadRegisterSuccess = createAction(
  '[Auth] Load Register Success',
  props<{ user: User }>()
);

export const loadRegisterFailure = createAction(
  '[Auth] Load Register Failure',
  props<{ error: any }>()
);
