import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffcts {
    loginSuccess = createEffect(() => this.action$.pipe(
        ofType(AuthActions.loadLoginSuccess),
        tap(action => {
            this.router.navigateByUrl('/');
        }),
    ), { dispatch: false });
    constructor(private action$: Actions, private router: Router) { }
}
