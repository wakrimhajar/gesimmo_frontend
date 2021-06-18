/*import {
  setLoadingSpinner,
  setErrorMessage,
} from './../../store/Shared/shared.actions';*/
import { JarwisService } from '../Services/jarwis.service';
import { exhaustMap, map, catchError, tap, mergeMap } from 'rxjs/operators';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess
} from './users.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
//import { AppState } from 'src/app/store/app.state';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: JarwisService,
    private store: Store<any>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.login(action.email, action.password).pipe(
          map((data) => {
           /* this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMessage({ message: '' }));*/
            const user = this.authService.formatUser(data);
         /*   this.authService.setUserInLocalStorage(user);*/
            return loginSuccess({ user, redirect: true });
          }),
       /*   catchError((errResp) => {
           this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })*/
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess]),
    /*    tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })*/
      );
    },
    { dispatch: false }
  );



  /*autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user = this.authService.getUserFromLocalStorage();
        return of(loginSuccess({ user, redirect: false }));
      })
    );
  });
*/
  /*logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map((action) => {
          this.authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );*/
}