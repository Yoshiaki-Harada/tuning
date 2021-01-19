import { ImportMock } from 'ts-mock-imports';
import { PostGateway } from '../../gateway/post-gateway';
import { SendPostUsecaseWithAnonymous } from '../../usecase/send-post-usecase-with-anonymous';
import * as driverModule from '../../driver/slack-driver';
import { ChannelId,  Post, PostId, Reply, Text, ThreadId } from '../../domain/post';
import * as sinon from "sinon";
import { Emoji, Emojis } from '../../domain/emoji';
describe('匿名でポストするテスト', () => {
    it('threadIdがある場合はリプライする', async () => {
        const mockManager = ImportMock.mockClass(driverModule, 'SlackDriver');
        const gateway = new PostGateway(mockManager.getMockInstance())
        const usecase = new SendPostUsecaseWithAnonymous(gateway)
        const originalText = 'テスト stamp=[:ok:]'
        const text = new Text('テスト')
        const channelId = new ChannelId('ch1')
        const threadId = new ThreadId('th2')
        const mock = sinon.mock(gateway)
        const postId = new PostId(channelId, new ThreadId('tid2'))
        const emojis = new Emojis([new Emoji('ok')])

        mock.expects('reply').once().withArgs(new Reply(text, emojis, channelId, threadId)).returns(postId)
        mock.expects('addEmoji').once().withArgs(postId, emojis)
        await usecase.run(originalText, channelId, threadId)
        mock.verify()
    }),
        it('threadIdがない場合はチャンネルにポストする', async () => {
            const mockManager = ImportMock.mockClass(driverModule, 'SlackDriver');
            const gateway = new PostGateway(mockManager.getMockInstance())
            const usecase = new SendPostUsecaseWithAnonymous(gateway)
            const originalText = 'テスト stamp=[:ok:]'
            const text = new Text('テスト')
            const channelId = new ChannelId('ch1')
            const mock = sinon.mock(gateway)
            const postId = new PostId(channelId, new ThreadId('tid2'))
            const emojis = new Emojis([new Emoji('ok')])
            const chPostResult: driverModule.ChatPostMessageResult = {channel: channelId.value, ts: '', message: {text: ''}, ok: true}
            mock.expects('send').once().withArgs(new Post(text, emojis, channelId)).returns(postId)
            mock.expects('addEmoji').once().withArgs(postId, emojis)

            mock.expects('reply').once().withArgs(new Reply(new Text(`返信用ID: tid2`), new Emojis([]), postId.channelId, postId.threadId)).returns(chPostResult)
            await usecase.run(originalText, channelId, null)
            mock.verify()
        })
})