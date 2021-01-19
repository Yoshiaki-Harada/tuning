import { Emojis } from "../domain/emoji";
import { Mention } from "../domain/mention";
import { Post, PostId, Reply } from "../domain/post";

export interface PostPort {
    send(post: Post, mention: Mention): Promise<PostId>;
    reply(reply: Reply, mention: Mention): Promise<PostId>;
    addEmoji(postId: PostId, emojis: Emojis): Promise<void>;
}