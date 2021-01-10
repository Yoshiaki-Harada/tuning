import { Store } from '@ngrx/store';
import { AuthState, User } from './auth.reducer';
import * as AuthActions from './auth.actions';
import { getUser } from './auth.selectors';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthFacade {
    user = this.store.select(getUser);

    constructor(private store: Store<AuthState>) { }

    loginSuccess(user: User): void {
        this.store.dispatch(AuthActions.loginSuccess({ user }));
    }
}
