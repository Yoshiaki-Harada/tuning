import policies, { tenRetriesInAboutThirtyMinutes } from "@slack/web-api/dist/retry-policies";
import { Emojis } from "../domain/emoji";
import { ChannelId, Destination, Post, PostId, Reply, ThreadId } from "../domain/post";
import { SlackDriver } from "../driver/slack-driver";
import { PostPort } from "../port/post-port";

export class PostGateway implements PostPort {
    constructor(private slackDriver: SlackDriver) { }
    async send(post: Post): Promise<PostId> {
        const result = await this.slackDriver.post(post.text.value, post.channelId.value);
        return new PostId(new ChannelId(result.channel), new ThreadId(result.ts))
    }

    async reply(reply: Reply): Promise<PostId> {
        const result = await this.slackDriver.reply(reply.text.value, reply.channelId.value, reply.threadId.value);
        return new PostId(new ChannelId(result.channel), new ThreadId(result.ts))
    }

    async addEmoji(postId: PostId, emojis: Emojis): Promise<void> {
        console.log('[Start]: Add Emoji')
        for await (const emoji of emojis.list) {
            try {
                await this.slackDriver.addReaction(emoji.value, postId.channelId.value, postId.threadId.value)
                console.log(`Add Emoji ${emoji.value}`)
            } catch (error) {
                console.log(`${error}`)
            }
        }
        console.log('[End]: Add Emoji')
    }
}