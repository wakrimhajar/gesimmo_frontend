import { createReducer, on } from '@ngrx/store';
import { User } from '../Model/user';
import { initialState } from './app.states';
import * as AuthActions from './auth.actions';
import { loginSuccess ,browserReload} from './auth.actions';

 export const AuthReducer = createReducer(
    initialState,
    
    on(AuthActions.loginSuccess, (state, action) => {
      return {
        ...state,
        user: action.user,
      };
    }),
    /* AuthActions.browserReload, */
  /*  on(AuthActions.browserReload, (state, action) => {
      return {
        ...state,
        user: action.user,
      }
    }), */
 
  );
  
 /* export function AuthReducer(state:any, action:any) {
    return _authReducer(state, action);
  }*/

