import { WebClient, WebAPICallResult } from '@slack/web-api';
export class SlackDriver {
    private web = new WebClient(this.token);
    constructor(private token: string) { }

    async post(text: string, channelId: string): Promise<ChatPostMessageResult> {
        const res = (await this.web.chat.postMessage({ text, channel: channelId }) as ChatPostMessageResult);
        return res
    }

    async reply(text: string, channelId: string, thread_ts: string): Promise<ChatPostMessageResult> {
        const res = (await this.web.chat.postMessage({ text, channel: channelId, thread_ts }) as ChatPostMessageResult);
        return res
    }

    async addReaction(emoji: string, channelId: string, timestamp: string) {
        await this.web.reactions.add({ name: emoji, channel: channelId, timestamp });
    }

    async getUsers(): Promise<UserListResult> {
        return await this.web.users.list() as UserListResult;
    }
}

export interface ChatPostMessageResult extends WebAPICallResult {
    channel: string;
    ts: string;
    message: {
        text: string;
    }
}


export interface UserListResult extends WebAPICallResult {
    members: {
        id: string;
        name:string;
    }[]
}