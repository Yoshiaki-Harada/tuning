import { expect } from "chai";
import { Emojis, Emoji } from "../../domain/emoji";
import { ChannelId, createPost, Destination, Post, Text, ThreadId } from "../../domain/post";

describe('文字列をパースしてPostを作成する', () => {
    it('複数行の場合', () => {
        const text = `テスト用の文字列1行目
            テスト用の文字列2行目
            stamp=[:ok: :good:]`;
        const post = createPost(text, new ChannelId('test'))

        const expectedText = `テスト用の文字列1行目
            テスト用の文字列2行目`;
        const expected = new Post(new Text(expectedText), new Emojis([new Emoji('ok'), new Emoji('good')]), new ChannelId('test'))
        expect(post).to.be.deep.equal(expected);
    })
})