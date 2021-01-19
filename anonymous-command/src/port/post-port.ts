import { Emojis } from "../domain/emoji";
import { Post, PostId, Reply } from "../domain/post";

export interface PostPort {
    send(post: Post): Promise<PostId>;
    reply(reply: Reply): Promise<PostId>;
    addEmoji(postId: PostId, emojis: Emojis): Promise<void>;
}