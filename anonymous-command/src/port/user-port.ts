import { User, UserName } from "../domain/user";

export interface UserPort {
    get(userName: UserName): Promise<User | null>;
}