import { User, UserId, UserName } from "../domain/user";
import { SlackDriver } from "../driver/slack-driver";
import { UserPort } from "../port/user-port";


export class UserGateway implements UserPort {
    constructor(private slackDriver: SlackDriver) { }
    async get(userName: UserName): Promise<User | null> {
        const result = await this.slackDriver.getUsers()
        const user = result.members.find(mem => mem.name === userName.value)
        return user ? new User(new UserId(user.id), new UserName(user.name)) : null
    }
}
