import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './app.states';
export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.user ? true : false;
});

export const getInfoUser = createSelector(getAuthState, (state) => {
  return state.user ? state.user.nom : null;
});