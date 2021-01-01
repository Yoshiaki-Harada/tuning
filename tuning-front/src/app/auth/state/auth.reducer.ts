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
  loggedIn: boolean;
}

export interface AuthState {
  readonly [authFeatureKey]: Auth;
}

export const initialState: Auth = { user: null, loggedIn: false };


export const reducer = createReducer(
  initialState,
  on(AuthActions.loadLoginSuccess, (state, action) => ({ ...state, loggedIn: true, user: action.user })),
  on(AuthActions.loadLoginFailure, (state, action) => ({ ...state })),
  on(AuthActions.loadRegisterSuccess, (state, action) => ({ ...state })),
  on(AuthActions.loadRegisterFailure, (state, action) => ({ ...state })),
);

export const authReducer = (state: Auth, action: Action): Auth => reducer(state, action);

