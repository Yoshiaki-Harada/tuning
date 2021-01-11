import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Auth, authFeatureKey } from './auth.reducer';

export const getAuth = createFeatureSelector<Auth>(authFeatureKey);

export const getUser = createSelector(getAuth, (auth: Auth) => auth.user);

export const getIsLogin = createSelector(getAuth, (auth: Auth) => auth.isLogin);
