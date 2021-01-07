import { ChatPostMessageResult, SlackDriver } from "../../driver/slack-driver"
import * as driverModule from "../../driver/slack-driver"
import { PostGateway } from "../../gateway/post-gateway"
import { ImportMock } from 'ts-mock-imports';
import { ChannelId, Destination, Post, PostId, Reply, Text, ThreadId } from "../../domain/post";
import { Emoji, Emojis } from "../../domain/emoji";
import * as sinonTs from "ts-sinon";
import * as sinon from "sinon";
import { expect } from "chai";
import { constants } from "os";
import { reset } from "sinon";


describe('PostGateway.addEmojisのテスト', () => {
    it('絵文字の追加でdriverがEmojiの個数分呼ばれる', async () => {
        const driver = new SlackDriver('')
        const mock = sinon.mock(driver)
        const postGateway = new PostGateway(driver)
        const emojis = new Emojis([new Emoji('ok'), new Emoji('bad')])

        mock.expects('addReaction').twice()
        await postGateway.addEmoji(new PostId(new ChannelId(''), new ThreadId('')), emojis)
        mock.verify()
    })
})

describe('PostGateway.sendのテスト', () => {
    it('driverのsendを呼びpostIdを返す', async () => {
        const driver = new SlackDriver('')
        const mock = sinon.mock(driver)
        const postGateway = new PostGateway(driver)
        const res: ChatPostMessageResult = { channel: 'cid', ts: 'tid2', message: { text: '' }, ok: true }

        mock.expects('post').once().withArgs('text', 'cid').returns(res)

        const result = await postGateway.send(new Post(new Text('text'), new Emojis([]), new ChannelId('cid')))
        expect(result).to.deep.equal(new PostId(new ChannelId('cid'), new ThreadId('tid2')))
        mock.verify()
    })
})

describe('PostGateway.replyのテスト', () => {
    it('driverのreplyを呼びpostIdを返す', async () => {
        const driver = new SlackDriver('')
        const mock = sinon.mock(driver)
        const postGateway = new PostGateway(driver)
        const res: ChatPostMessageResult = { channel: 'cid', ts: 'tid2', message: { text: '' }, ok: true }

        mock.expects('reply').once().withArgs('text', 'cid').returns(res)

        const result = await postGateway.reply(new Reply(new Text('text'), new Emojis([]), new ChannelId('cid'), new ThreadId('tid')))
        expect(result).to.deep.equal(new PostId(new ChannelId('cid'), new ThreadId('tid2')))
        mock.verify()
    })
})
