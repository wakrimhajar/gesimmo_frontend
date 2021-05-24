import { AUTH_STATE_NAME } from '../auth.selector';
import { AuthReducer } from '../auth.reducer';
import { AuthState } from '../app.states';

export interface AppState {

  [AUTH_STATE_NAME]: AuthState;

}

export const appReducer = {

  [AUTH_STATE_NAME]: AuthReducer,

};