import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/+state/auth.reducer';

@Injectable()
export class LocalStorageDriver {
    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}
