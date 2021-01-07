"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var emoji_1 = require("../../domain/emoji");
describe('文字列をパースしてEmojiを作成する', function () {
    it('1行の場合', function () {
        var text = 'テスト用の文字列 stamp=[:ok: :good:]';
        var result = emoji_1.createEmojis(text);
        var expected = new emoji_1.Emojis([new emoji_1.Emoji('ok'), new emoji_1.Emoji('good')]);
        chai_1.expect(result).to.be.deep.equal(expected);
    }),
        it('[]のみの場合', function () {
            var text = 'テスト用の文字列 [:ok:]';
            var result = emoji_1.createEmojis(text);
            var expected = new emoji_1.Emojis([]);
            chai_1.expect(result).to.be.deep.equal(expected);
        }),
        it('絵文字がない場合', function () {
            var text = 'テスト用の文字列';
            var result = emoji_1.createEmojis(text);
            var expected = new emoji_1.Emojis([]);
            chai_1.expect(result).to.be.deep.equal(expected);
        });
});
