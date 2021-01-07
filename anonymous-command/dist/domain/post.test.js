"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var post_1 = require("./post");
describe('Postのテスト', function () {
    it('文字列をパースしてPostを作成する', function () {
        var text = 'テスト用の文字列 :ok :good';
        var post = post_1.createPost(text, new post_1.Destination(new post_1.ChannelId('test'), new post_1.ThreadId('test')));
        var expected = new post_1.Post(new post_1.Text('テスト用の文字列'), new post_1.Emojis([new post_1.Emoji('ok'), new post_1.Emoji('good')]), new post_1.Destination(new post_1.ChannelId('test'), new post_1.ThreadId('test')));
    });
});
