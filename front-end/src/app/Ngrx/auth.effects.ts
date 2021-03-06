import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable,of } from 'rxjs';

import { catchError, exhaustMap, takeUntil, tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { JarwisService } from '../Services/jarwis.service';
//import { AuthActionTypes, LogIn, LogInSuccess } from './auth.actions';
import { User } from '../Model/user';
import { loginStart, loginSuccess } from './auth.actions';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: JarwisService,
    private router: Router,
  ) {}

                 login=createEffect( 
                    ()=> {return this.actions.pipe(
                        ofType(AuthActions.loginStart),
                       // map((action: LogIn) => action.payload),
                        exhaustMap((action) =>
                          this.authService
                            .login(action.email, action.password)
                            .pipe(
                              map((user) => {
                                localStorage.setItem('user', JSON.stringify(user));
                               //const user = this.authService.formatUser(data);
                                console.log(user);
                              return AuthActions.loginSuccess({user, redirect: true });
                              
                              //  return AuthActions.browserReload({user });
                              },
                              ),
                            )
                        )
                 ) });  
                 
                 
        

}