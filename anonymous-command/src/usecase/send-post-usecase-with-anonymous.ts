import { Emoji, Emojis } from "../domain/emoji";
import { ChannelId, createPost, createReply, createThreadId, Post, PostId, Reply, Text, ThreadId } from "../domain/post";
import { PostPort } from "../port/post-port";

export class SendPostUsecaseWithAnonymous {
    constructor(private postPort: PostPort) { }
    async run(originalText: string, channelId: ChannelId) {
        let postId: PostId;
        const threadId = createThreadId(originalText);
        if (threadId !== null) {
            console.log('REPLY')
            const reply = createReply(originalText, channelId, threadId)
            postId = await this.postPort.reply(reply)
            await this.postPort.addEmoji(postId, reply.emojis)
        } else {
            console.log('SEND')
            const post = createPost(originalText, channelId)
            postId = await this.postPort.send(post)
            await this.postPort.addEmoji(postId, post.emojis)
            await this.postPort.reply(new Reply(new Text(`返信用ID: ${postId.threadId.value}`), new Emojis([]), postId.channelId, postId.threadId))
        }
    }
}