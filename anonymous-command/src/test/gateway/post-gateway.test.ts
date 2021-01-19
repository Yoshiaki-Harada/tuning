import { ChatPostMessageResult, SlackDriver } from "../../driver/slack-driver"
import { PostGateway } from "../../gateway/post-gateway"
import { ChannelId,  Post, PostId, Reply, Text, ThreadId } from "../../domain/post";
import { Emoji, Emojis } from "../../domain/emoji";
import * as sinon from "sinon";
import { expect } from "chai";
import { Mention } from "../../domain/mention";
import { User, UserId, UserName } from "../../domain/user";


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
        const mention = new Mention([new User( new UserId('test001'), new UserName('taro.test')), new User( new UserId('test002'), new UserName('taro.test'))])

        mock.expects('post').once().withArgs('text <@test001> <@test002>', 'cid').returns(res)

        const result = await postGateway.send(new Post(new Text('text'), new Emojis([]), new ChannelId('cid')), mention)
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
        const mention = new Mention([new User( new UserId('test001'), new UserName('taro.test')), new User( new UserId('test002'), new UserName('taro.test'))])

        mock.expects('reply').once().withArgs('text <@test001> <@test002>', 'cid').returns(res)

        const result = await postGateway.reply(new Reply(new Text('text'), new Emojis([]), new ChannelId('cid'), new ThreadId('tid')), mention)
        expect(result).to.deep.equal(new PostId(new ChannelId('cid'), new ThreadId('tid2')))
        mock.verify()
    })
})

describe('メンション用文字列作成のテスト', ()=> {
    it('メンションにユーザがいる時', ()=> {
        const driver = new SlackDriver('')
        const postGateway = new PostGateway(driver)
        const mention = new Mention([new User( new UserId('test001'), new UserName('taro.test')), new User( new UserId('test002'), new UserName('taro.test'))])
        const result = postGateway.createMentionText(mention)
        expect(result).to.deep.equal('<@test001> <@test002>')
    }),
    it('メンションにユーザがいない時', ()=> {
        const driver = new SlackDriver('')
        const postGateway = new PostGateway(driver)
        const mention = new Mention([])
        const result = postGateway.createMentionText(mention)
        expect(result).to.deep.equal('')
    })
})