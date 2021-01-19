import { userRegExp } from "./tempate"

export class User {
    constructor(readonly id: UserId, readonly name : UserName){}
}

export class UserId {
    constructor(readonly value) { }
}

export class UserName {
    constructor(readonly value) { }
}
export function getUserNames(originalText: string): UserName[] {
    let users: UserName[] = []
    var match: RegExpExecArray | null;
    while (match = userRegExp.exec(originalText)) {
        users.push(new UserName(match[1]))
    }
    return users;
}