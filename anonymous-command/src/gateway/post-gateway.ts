import policies, { tenRetriesInAboutThirtyMinutes } from "@slack/web-api/dist/retry-policies";
import { Emojis } from "../domain/emoji";
import { ChannelId, Destination, Post, PostId, Reply, ThreadId } from "../domain/post";
import { SlackDriver } from "../driver/slack-driver";
import { PostPort } from "../port/post-port";

export class PostGateway implements PostPort {
    constructor(private slackDriver: SlackDriver) { }
    async send(post: Post): Promise<PostId> {
        console.log('[POSTGATEWAY::send] START')
        console.log(`channelId: ${post.channelId.value}`)
        const result = await this.slackDriver.post(post.text.value, post.channelId.value);
        console.log('[POSTGATEWAY::send] END')
        return new PostId(new ChannelId(result.channel), new ThreadId(result.ts))
    }

    async reply(reply: Reply): Promise<PostId> {
        console.log('[POSTGATEWAY::reply] START')
        console.log(`channelId: ${reply.channelId.value}, thredId: ${reply.threadId.value}`)
        const result = await this.slackDriver.reply(reply.text.value, reply.channelId.value, reply.threadId.value);
        console.log('[POSTGATEWAY::reply] END')
        return new PostId(new ChannelId(result.channel), new ThreadId(result.ts))
    }

    async addEmoji(postId: PostId, emojis: Emojis): Promise<void> {
        console.log('[POSTGATEWAY::addEmoji] START')
        console.log(`channelId: ${postId.channelId}, thredId: ${postId.threadId}`)
        for await (const emoji of emojis.list) {
            try {
                await this.slackDriver.addReaction(emoji.value, postId.channelId.value, postId.threadId.value)
                console.log(`Add Emoji ${emoji.value}`)
            } catch (error) {
                console.log(`${error}`)
            }
        }
        console.log('[POSTGATEWAY::addEmoji] END')
    }
}