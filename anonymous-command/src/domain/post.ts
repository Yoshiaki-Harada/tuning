import { restore } from "sinon";
import { createEmojis, Emojis } from "./emoji"
import { reolyIdCommandRegExp as replyIdCommandRegExp, stampCommandRegExp } from "./tempate";

export class Post {
    constructor(readonly text: Text, readonly emojis: Emojis, readonly channelId: ChannelId) { }
}

export class Reply {
    constructor(readonly text: Text, readonly emojis: Emojis, readonly channelId: ChannelId, readonly threadId: ThreadId) { }
}
function createText(originalText: string) {
    const text = originalText.replace(stampCommandRegExp, '').replace(replyIdCommandRegExp, '').trim();
    return new Text(text)
}
export function createPost(originalText: string, channelId: ChannelId): Post {
    const emojis = createEmojis(originalText)
    return new Post(createText(originalText), emojis, channelId)
}

export function createReply(originalText: string, channelId: ChannelId, threadId: ThreadId): Reply {
    const emojis = createEmojis(originalText)
    return new Reply(createText(originalText), emojis, channelId, threadId)
}

export function createThreadId(originalText: string): ThreadId | null {
    console.log(`originalText: ${originalText}`)
    const result = replyIdCommandRegExp.exec(originalText);
    console.log(result)
    if (result === null || result[1].toString() === '') {
        return null;
    }
    return new ThreadId(result[1].toString())
}


export class Text {
    constructor(readonly value: string) { }
}

export class Destination {
    constructor(readonly channelId: ChannelId, readonly threadId: ThreadId | null) { }
}

export class PostId {
    constructor(readonly channelId: ChannelId, readonly threadId: ThreadId) { }
}

export class ChannelId {
    constructor(readonly value: string) { }
}

export class ThreadId {
    constructor(readonly value: string) { }
}
