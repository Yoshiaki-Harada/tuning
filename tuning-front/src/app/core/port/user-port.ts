import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/+state/auth.reducer';

@Injectable()
export abstract class UserPort {
    constructor() { }
    abstract get(): User;
    abstract delete(): void;
    abstract set(user: User): void;
}
