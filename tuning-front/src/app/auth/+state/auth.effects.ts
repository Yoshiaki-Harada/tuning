import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { LocalStorageDriver } from 'src/app/core/driver/local-storage-driver';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffcts {
    loginSuccess = createEffect(() => this.action$.pipe(
        ofType(AuthActions.loginSuccess),
        map(action => action.user),
        tap(user => {
            this.localStorageDriver.setUser(user);
            this.router.navigate(['']);
        }),
        map(user => AuthActions.loginOrAuthSuccessed({ user }))
    ));
    autoLogin = createEffect(() => this.action$.pipe(
        ofType(AuthActions.autoLogin),
        map(action => {
            const user = this.localStorageDriver.getUser();
            if (user !== null) {
                return AuthActions.loginSuccess({ user });
            }
            return AuthActions.loginFailure({ error: Error('Failed to Auto login') });
        })
    ));

    logout = createEffect(() => this.action$.pipe(
        ofType(AuthActions.logout),
        tap(action => {
            this.localStorageDriver.deleteUser();
            this.router.navigate(['/login']);
        })
    ), { dispatch: false });
    constructor(private action$: Actions, private router: Router, private localStorageDriver: LocalStorageDriver) { }
}
