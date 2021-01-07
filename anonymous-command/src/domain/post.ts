import { createEmojis, Emojis } from "./emoji"

export class Post {
    constructor(readonly text: Text, readonly emojis: Emojis, readonly channelId: ChannelId) { }
}

export class Reply {
    constructor(readonly text: Text, readonly emojis: Emojis, readonly channelId: ChannelId, readonly threadId: ThreadId) { }
}

export function createPost(originalText: string, channelId: ChannelId): Post {
    const emojis = createEmojis(originalText)
    const text = originalText.replace(/stamp=\[.*\]/g, '').trim();
    return new Post(new Text(text), emojis, channelId)
}

export function createReply(originalText: string, channelId: ChannelId, threadId: ThreadId): Reply {
    const emojis = createEmojis(originalText)
    const text = originalText.replace(/stamp=\[.*\]/g, '').trim();
    return new Reply(new Text(text), emojis, channelId, threadId)
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
