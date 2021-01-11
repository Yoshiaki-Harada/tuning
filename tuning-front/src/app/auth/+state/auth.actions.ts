import { createAction, props } from '@ngrx/store';
import { User } from './auth.reducer';


export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ user: User }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);

export const loginOrAuthSuccessed = createAction(
  '[Auth] Login or Auth Successed',
  props<{ user: User }>()
);

export const autoLogin = createAction(
  '[Auth] Auto login'
);

export const logout = createAction(
  '[Auth] Logout'
);
