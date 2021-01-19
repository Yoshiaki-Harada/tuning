import { ImportMock } from 'ts-mock-imports';
import { PostGateway } from '../../gateway/post-gateway';
import { SendPostUsecaseWithAnonymous } from '../../usecase/send-post-usecase-with-anonymous';
import * as driverModule from '../../driver/slack-driver';
import { ChannelId, Post, PostId, Reply, Text, ThreadId } from '../../domain/post';
import *  as postModule from '../../domain/post';
import *  as userModule from '../../domain/user';
import {User, UserId, UserName} from '../../domain/user';
import * as sinon from "sinon";
import { Emoji, Emojis } from '../../domain/emoji';
import { UserGateway } from '../../gateway/user-gateway';
import { Mention } from '../../domain/mention';

describe('匿名でポストするテスト', () => {
    it('threadIdがある場合はリプライする', async () => {
        const mockManager = ImportMock.mockClass(driverModule, 'SlackDriver');
        const gateway = new PostGateway(mockManager.getMockInstance())
        const userGateway = new UserGateway(mockManager.getMockInstance())
        const usecase = new SendPostUsecaseWithAnonymous(gateway,userGateway)
        const originalText = 'テスト stamp=[:ok:] id=[th2]'
        const text = new Text('テスト')
        const channelId = new ChannelId('ch1')
        const threadId = new ThreadId('th2')
        const mock = sinon.mock(gateway)
        const postId = new PostId(channelId, new ThreadId('tid2'))
        const emojis = new Emojis([new Emoji('ok')])
        const stub = ImportMock.mockFunction(postModule, 'createThreadId', threadId);

        mock.expects('reply').once().withArgs(new Reply(text, emojis, channelId, threadId)).returns(postId)
        mock.expects('addEmoji').once().withArgs(postId, emojis)
        await usecase.run(originalText, channelId)
        mock.verify()
        mockManager.restore()
        stub.restore()
    }),
        it('threadIdがない場合はチャンネルにポストする', async () => {
            const mockManager = ImportMock.mockClass(driverModule, 'SlackDriver');
            const gateway = new PostGateway(mockManager.getMockInstance())
            const userGateway = new UserGateway(mockManager.getMockInstance())
            const usecase = new SendPostUsecaseWithAnonymous(gateway, userGateway)
            const originalText = 'テスト stamp=[:ok:]'
            const text = new Text('テスト')
            const channelId = new ChannelId('ch1')
            const mock = sinon.mock(gateway)
            const postId = new PostId(channelId, new ThreadId('tid2'))
            const emojis = new Emojis([new Emoji('ok')])
            const chPostResult: driverModule.ChatPostMessageResult = { channel: channelId.value, ts: '', message: { text: '' }, ok: true }

            const stub = ImportMock.mockFunction(postModule, 'createThreadId', null);
            mock.expects('send').once().withArgs(new Post(text, emojis, channelId)).returns(postId)
            mock.expects('addEmoji').once().withArgs(postId, emojis)

            mock.expects('reply').once().withArgs(new Reply(new Text(`返信用ID: tid2`), new Emojis([]), postId.channelId, postId.threadId)).returns(chPostResult)
            await usecase.run(originalText, channelId)
            mock.verify()
            mockManager.restore()
            stub.restore()
        }),
        it('メンションがある場合メンションをつけてチャンネルにポストする', async () => {
            const mockManager = ImportMock.mockClass(driverModule, 'SlackDriver');
            const gateway = new PostGateway(mockManager.getMockInstance())
            const userGateway = new UserGateway(mockManager.getMockInstance())
            const usecase = new SendPostUsecaseWithAnonymous(gateway, userGateway)
            const originalText = 'テスト stamp=[:ok:] @test.taro @yamada.test'
            const name1 = new userModule.UserName('test.taro')
            const name2 = new userModule.UserName('yamada.test')
            const user1 = new User(new UserId('001'), new UserName(name1))
            const user2 = new User(new UserId('002'), new UserName(name2))

            const text = new Text('テスト')
            const channelId = new ChannelId('ch1')
            const postMock = sinon.mock(gateway)
            const userMock = sinon.mock(userGateway)
            const postId = new PostId(channelId, new ThreadId('tid2'))
            const emojis = new Emojis([new Emoji('ok')])
            const chPostResult: driverModule.ChatPostMessageResult = { channel: channelId.value, ts: '', message: { text: '' }, ok: true }
            const stub = ImportMock.mockFunction(postModule, 'createThreadId', null);
            const usersStab = ImportMock.mockFunction(userModule, 'getUserNames', [name1, name2]);
            userMock.expects('get').once().withArgs(name1).returns(user1)
            userMock.expects('get').once().withArgs(name2).returns(user2)

            postMock.expects('send').once().withArgs(new Post(text, emojis, channelId), new Mention([user1, user2])).returns(postId)
            postMock.expects('addEmoji').once().withArgs(postId, emojis)

            postMock.expects('reply').once().withArgs(new Reply(new Text(`返信用ID: tid2`), new Emojis([]), postId.channelId, postId.threadId)).returns(chPostResult)
            await usecase.run(originalText, channelId)
            postMock.verify()
            userMock.verify()
            mockManager.restore()
            stub.restore()
            usersStab.restore()
        })
})