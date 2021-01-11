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
            console.log('EFFECTS login success');
            console.log(user);
            this.localStorageDriver.setUser(user);
            this.router.navigate(['']);
        }),
        map(user => AuthActions.loginOrAuthSuccessed({ user }))
    ));
    constructor(private action$: Actions, private router: Router, private localStorageDriver: LocalStorageDriver) { }
}
