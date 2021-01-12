import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/+state/auth.reducer';
import { LocalStorageDriver } from '../driver/local-storage-driver';
import { UserPort } from '../port/user-port';

@Injectable()
export class UserGateway extends UserPort {

    constructor(private driver: LocalStorageDriver) {
        super();
    }

    delete(): void {
        this.driver.deleteUser();
    }

    set(user: User): void {
        this.driver.setUser(user);
    }

    get(): User {
        return this.driver.getUser();
    }
}
