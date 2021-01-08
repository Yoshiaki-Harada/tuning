import { Emoji, Emojis } from "../domain/emoji";
import { ChannelId, createPost, createReply, Post, PostId, Reply, Text, ThreadId } from "../domain/post";
import { PostPort } from "../port/post-port";

export class SendPostUsecaseWithAnonymous {
    constructor(private postPort: PostPort) { }
    async run(originalText: string, channelId: ChannelId, threadId: ThreadId | null) {
        let postId: PostId;
        if (threadId !== null) {
            console.log('[START SendPostUsecaseWithAnonymous] POST')
            const reply = createReply(originalText, channelId, threadId)
            postId = await this.postPort.reply(reply)
            console.log('[END SendPostUsecaseWithAnonymous] POST')
            console.log('[START SendPostUsecaseWithAnonymous] EMOJI')
            await this.postPort.addEmoji(postId, reply.emojis)
            console.log('[END SendPostUsecaseWithAnonymous] EMOJI')
        } else {
            console.log('[START SendPostUsecaseWithAnonymous] POST')
            const post = createPost(originalText, channelId)
            console.log('[END SendPostUsecaseWithAnonymous] POST')
            console.log('[START SendPostUsecaseWithAnonymous] EMOJI')
            postId = await this.postPort.send(post)
            console.log('[START SendPostUsecaseWithAnonymous] EMOJI')
            await this.postPort.addEmoji(postId, post.emojis)
            console.log('[END SendPostUsecaseWithAnonymous] EMOJI')
            await this.postPort.reply(new Reply(new Text(`返信用ID: ${postId.threadId.value}`), new Emojis([]), postId.channelId, postId.threadId))
        }
    }
}