import { expect } from "chai";
import { Emojis, Emoji } from "../../domain/emoji";
import { ChannelId, createPost, createThreadId, Destination, Post, Text, ThreadId } from "../../domain/post";

describe('文字列をパースしてPostを作成する', () => {
    it('複数行の場合', () => {
        const text = `テスト用の文字列1行目
            テスト用の文字列2行目
            stamp=[:ok: :good:]
            id=[test001]`;
        const post = createPost(text, new ChannelId('test'))

        const expectedText = `テスト用の文字列1行目
            テスト用の文字列2行目`;
        const expected = new Post(new Text(expectedText), new Emojis([new Emoji('ok'), new Emoji('good')]), new ChannelId('test'))
        expect(post).to.be.deep.equal(expected);
    })
})


describe('文字列をパースしてThreadIdを作成する', () => {
    it('idが存在する場合ThreadIdを返す', () => {
        const text = 'テスト stamp=[:ok:] id=[th2]';
        const threadId = createThreadId(text)
        const expected = new ThreadId('th2')
        expect(threadId).to.be.deep.equal(expected);
    })
    it('idが存在しない場合nullを返す', () => {
        const text = `テスト用の文字列1行目
            テスト用の文字列2行目
            stamp=[:ok: :good:]`;
        const threadId = createThreadId(text)
        expect(threadId).to.be.deep.equal(null);
    })
    it('idが空の場合nullを返す', () => {
        const text = `テスト用の文字列1行目
            テスト用の文字列2行目
            stamp=[:ok: :good:]
            id=[]`;
        const threadId = createThreadId(text)
        expect(threadId).to.be.deep.equal(null);
    })
})