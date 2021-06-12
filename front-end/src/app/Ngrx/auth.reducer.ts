import { createReducer, on } from '@ngrx/store';
import { User } from '../Model/user';
import { initialState } from './app.states';
import { loginSuccess ,browserReload} from './auth.actions';

  const _authReducer = createReducer(
    initialState,
    
    on(loginSuccess, (state, action) => {
      return {
        ...state,
        user: action.user,
      }
    }),

 
  );
  
  export function AuthReducer(state:any, action:any) {
    return _authReducer(state, action);
  }

