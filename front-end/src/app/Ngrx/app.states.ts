import { User } from '../Model/user';
import * as auth from './auth.reducer';
import { ActionReducerMap, createFeatureSelector, State } from '@ngrx/store';



export interface AuthState {
  user: User | null;
}

export const initialState: AuthState = {
  user: null,
};

/*export interface AppState {
    authState: auth.State;
  }
  /*
  export const reducers =  { //:ActionReducerMap<State>
    auth: auth.reducer
  };

  

  export const selectAuthState = createFeatureSelector<AppState>('auth');

  */