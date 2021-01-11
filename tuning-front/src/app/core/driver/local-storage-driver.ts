import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/+state/auth.reducer';

@Injectable()
export class LocalStorageDriver {
    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): User | null {
        const userJson = localStorage.getItem('user');
        if (userJson !== null) {
            return JSON.parse(userJson);
        }
        return null;
    }

    deleteUser(): void {
        localStorage.removeItem('user');
    }
}
