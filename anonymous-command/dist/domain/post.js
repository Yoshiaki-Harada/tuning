"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadId = exports.ChannelId = exports.PostId = exports.Destination = exports.Text = exports.createReply = exports.createPost = exports.Reply = exports.Post = void 0;
var emoji_1 = require("./emoji");
var Post = /** @class */ (function () {
    function Post(text, emojis, channelId) {
        this.text = text;
        this.emojis = emojis;
        this.channelId = channelId;
    }
    return Post;
}());
exports.Post = Post;
var Reply = /** @class */ (function () {
    function Reply(text, emojis, channelId, threadId) {
        this.text = text;
        this.emojis = emojis;
        this.channelId = channelId;
        this.threadId = threadId;
    }
    return Reply;
}());
exports.Reply = Reply;
function createPost(originalText, channelId) {
    var emojis = emoji_1.createEmojis(originalText);
    var text = originalText.replace(/stamp=\[.*\]/g, '').trim();
    return new Post(new Text(text), emojis, channelId);
}
exports.createPost = createPost;
function createReply(originalText, channelId, threadId) {
    var emojis = emoji_1.createEmojis(originalText);
    var text = originalText.replace(/stamp=\[.*\]/g, '').trim();
    return new Reply(new Text(text), emojis, channelId, threadId);
}
exports.createReply = createReply;
var Text = /** @class */ (function () {
    function Text(value) {
        this.value = value;
    }
    return Text;
}());
exports.Text = Text;
var Destination = /** @class */ (function () {
    function Destination(channelId, threadId) {
        this.channelId = channelId;
        this.threadId = threadId;
    }
    return Destination;
}());
exports.Destination = Destination;
var PostId = /** @class */ (function () {
    function PostId(channelId, threadId) {
        this.channelId = channelId;
        this.threadId = threadId;
    }
    return PostId;
}());
exports.PostId = PostId;
var ChannelId = /** @class */ (function () {
    function ChannelId(value) {
        this.value = value;
    }
    return ChannelId;
}());
exports.ChannelId = ChannelId;
var ThreadId = /** @class */ (function () {
    function ThreadId(value) {
        this.value = value;
    }
    return ThreadId;
}());
exports.ThreadId = ThreadId;
