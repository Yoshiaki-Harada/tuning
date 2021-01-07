import { Injectable } from "@angular/core";
import { User } from "src/app/auth/state/auth.reducer";

@Injectable()
export class LcalStorageDriver {
    setUser(user: User) {
        localStorage.setItem('user', JSON.stringify(user));
    }
}
