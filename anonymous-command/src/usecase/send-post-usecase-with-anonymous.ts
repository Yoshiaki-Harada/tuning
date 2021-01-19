import { Emoji, Emojis } from "../domain/emoji";
import { Mention } from "../domain/mention";
import { ChannelId, createPost, createReply, createThreadId, Post, PostId, Reply, Text, ThreadId } from "../domain/post";
import { getUserNames, User } from "../domain/user";
import { PostPort } from "../port/post-port";
import { UserPort } from "../port/user-port";

export class SendPostUsecaseWithAnonymous {
    constructor(private postPort: PostPort, private userPort: UserPort) { }
    async run(originalText: string, channelId: ChannelId) {
        console.log('originalText:')
        console.log(originalText);
        let postId: PostId;
        const threadId = createThreadId(originalText)
        const userNames = getUserNames(originalText);
        const userPromies = userNames.map(async (name) => { return await this.userPort.get(name); })
            .filter(async (pr) => { const result = await pr; return result !== null; })

        const users: User[] =await Promise.all(userPromies).then(result => {
            return result.filter(e => e !== null) as User[]
        })

        if (threadId !== null) {
            console.log('REPLY')
            const reply = createReply(originalText, channelId, threadId)
            postId = await this.postPort.reply(reply, new Mention(users))
            await this.postPort.addEmoji(postId, reply.emojis)
        } else {
            console.log('SEND')
            const post = createPost(originalText, channelId)
            postId = await this.postPort.send(post, new Mention(users))
            await this.postPort.addEmoji(postId, post.emojis)
            await this.postPort.reply(new Reply(new Text(`返信用ID: ${postId.threadId.value}`), new Emojis([]), postId.channelId, postId.threadId), new Mention([]))
        }
    }
}