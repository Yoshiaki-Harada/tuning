import { ChannelId, createPost, Destination, Post, Text, ThreadId } from '../../domain/post';
import { assert, expect } from "chai"
import { createEmojis, Emoji, Emojis } from '../../domain/emoji';

describe('文字列をパースしてEmojiを作成する', () => {
    it('1行の場合', () => {
        const text = 'テスト用の文字列 stamp=[:ok: :good:]'
        const result = createEmojis(text)
        const expected = new Emojis([new Emoji('ok'), new Emoji('good')])
        expect(result).to.be.deep.equal(expected)
    }),
        it('[]のみの場合', () => {
            const text = 'テスト用の文字列 [:ok:]'
            const result = createEmojis(text)
            const expected = new Emojis([])
            expect(result).to.be.deep.equal(expected)
        }),
        it('絵文字がない場合', () => {
            const text = 'テスト用の文字列'
            const result = createEmojis(text)
            const expected = new Emojis([])
            expect(result).to.be.deep.equal(expected)
        })
})