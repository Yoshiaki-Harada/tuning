import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export const authFeatureKey = 'auth';

export interface User {
  displayName: string;
  email: string;
  photoURL: string;
  providerId: string;
  uid: string;
  refreshToken: string;
}

export interface Auth {
  user: User;
  isLogin: boolean;
}

export interface AuthState {
  readonly [authFeatureKey]: Auth;
}

export const initialState: Auth = { user: null, isLogin: false };


export const reducer = createReducer(
  initialState,
  on(AuthActions.loginFailure, (state, action) => ({ ...state, user: null, isLogin: false })),
  on(AuthActions.loginOrAuthSuccessed, (state, action) => ({ ...state, ...action, isLogin: true })),
  on(AuthActions.registerSuccess, (state, action) => ({ ...state, isLogin: true })),
  on(AuthActions.registerFailure, (state, action) => ({ ...state, isLogin: false })),
);

export const authReducer = (state: Auth, action: Action): Auth => reducer(state, action);

