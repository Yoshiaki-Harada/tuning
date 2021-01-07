"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var emoji_1 = require("../../domain/emoji");
var post_1 = require("../../domain/post");
describe('文字列をパースしてPostを作成する', function () {
    it('複数行の場合', function () {
        var text = "\u30C6\u30B9\u30C8\u7528\u306E\u6587\u5B57\u52171\u884C\u76EE\n            \u30C6\u30B9\u30C8\u7528\u306E\u6587\u5B57\u52172\u884C\u76EE\n            stamp=[:ok: :good:]";
        var post = post_1.createPost(text, new post_1.ChannelId('test'));
        var expectedText = "\u30C6\u30B9\u30C8\u7528\u306E\u6587\u5B57\u52171\u884C\u76EE\n            \u30C6\u30B9\u30C8\u7528\u306E\u6587\u5B57\u52172\u884C\u76EE";
        var expected = new post_1.Post(new post_1.Text(expectedText), new emoji_1.Emojis([new emoji_1.Emoji('ok'), new emoji_1.Emoji('good')]), new post_1.ChannelId('test'));
        chai_1.expect(post).to.be.deep.equal(expected);
    });
});
