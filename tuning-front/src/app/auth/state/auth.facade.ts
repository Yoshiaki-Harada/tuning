import { Store } from '@ngrx/store';
import { AuthState, User } from './auth.reducer';
import * as AuthActions from './auth.actions';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthFacade {
    constructor(private store: Store<AuthState>) { }

    login(user: User): void {
        this.store.dispatch(AuthActions.loadLoginSuccess({ user }));
    }
}
