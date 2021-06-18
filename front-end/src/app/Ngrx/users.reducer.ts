import { loginSuccess, autoLogout } from './users.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './users.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
    //  user: action.user,
    user: action.user,
    };
  }),

  on(autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

