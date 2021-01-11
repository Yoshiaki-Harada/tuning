import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Auth, authFeatureKey } from './auth.reducer';

export const getAuth = createFeatureSelector<Auth>(authFeatureKey);

export const getUser = createSelector(getAuth, (auth: Auth) => {
  console.log('auth');
  console.log(auth);
  return auth.user;
});
