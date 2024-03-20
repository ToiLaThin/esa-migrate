import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth.actions';
import { EMPTY, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { SignalrService } from '../../core/services/signalr.service';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
    constructor(
        private actions$: Actions,
        private _authService: AuthService,
        private _router: Router,
        private _signalrService: SignalrService
    ) {}

    loginAttempEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.loginAttempted),
            switchMap(() => {
                this._authService.login();
                return of(authActions.loginWaiting()); //just a dummy event to have sth to return
            })
        )
    );

    loginRedirectEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.loginRedirected),
            map(() => {
                this._authService.finishLogin().then((user) => {
                    this._signalrService.initConnection();
                    this._router.navigate(['/'], { replaceUrl: true });
                });
                return authActions.loginWaiting(); //just a dummy event to have sth to return
            })
        )
    );

    logoutAttempEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.logoutAttempted),
            switchMap(() => {
                this._authService.logout();
                return of(authActions.logoutWaiting()); //just a dummy event to have sth to return
            })
        )
    );

    logoutRedirectEffect = createEffect(() =>
        this.actions$.pipe(
            ofType(authActions.logoutRedirected),
            map(() => {
                this._authService.finishLogout().then(() => {
                    this._signalrService.stopConnection();
                    this._router.navigate(['/'], { replaceUrl: true });
                });
                return authActions.logoutWaiting();
            })
        )
    );
}
