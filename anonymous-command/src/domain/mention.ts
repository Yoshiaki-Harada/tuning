import { User, UserId } from "./user";

export class Mention {
    constructor(readonly users: User[]) {}
    getUserIds : UserId[]= this.users.map(user => user.id)
}