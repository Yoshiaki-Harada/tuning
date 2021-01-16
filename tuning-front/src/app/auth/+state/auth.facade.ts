import { Store } from '@ngrx/store';
import { AuthState, User } from './auth.reducer';
import * as AuthActions from './auth.actions';
import { getIsLogin, getUser } from './auth.selectors';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/post-list/+state/post-list.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthFacade {
    readonly user = this.store.select(getUser);
    readonly isLogin = this.store.select(getIsLogin);
    constructor(private store: Store<AuthState>) { }

    loginSuccess(user: User): void {
        this.store.dispatch(AuthActions.loginSuccess({ user }));
    }

    autoLogin(): void {
        this.store.dispatch(AuthActions.autoLogin());
    }

    logout(): void {
        console.log('call logout');
        this.store.dispatch(AuthActions.logout());
    }

    isMine(post: Post): Observable<boolean> {
        return this.user.pipe(
            map(user => {
                console.log(`userId:  ${user.id}`);
                console.log(`post  userId:  ${post.userId}`);
                return user.id === post.userId;
            })
        );
    }
}
