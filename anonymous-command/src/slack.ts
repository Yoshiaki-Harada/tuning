import qs, { ParsedUrlQuery } from 'querystring';
import { Destination, ChannelId, createPost } from './domain/post';
import { SlackDriver } from './driver/slack-driver';
import { PostGateway } from './gateway/post-gateway';
import { SendPostUsecaseWithAnonymous as SendPostUsecaseByAnonymous } from './usecase/send-post-usecase-with-anonymous';
import * as aws from 'aws-sdk';
// export async function wrapHandler(event, context, callback) {
//     const lambda = new aws.Lambda()
//     const params = {
//         FunctionName: 'SlackFunction',  // 実行するLambda
//         InvocationType: 'Event',
//         Payload: JSON.stringify(event.body)
//     };
//     console.log('before call lambda');
//     const invoke = await lambda.invoke(params).promise();
//     console.log('after call lambda');
//     return { statusCode: 200, body: '投稿を受付ました' };
// }

export async function anonymousHandler(event, context, callback) {
    callback(null, { statusCode: 200, body: '投稿を受付ました' })
    console.log('[START] ANONYMOUS POST');
    let response;
    let token = process.env.SLACK_TOKEN;
    if (!token) {
        throw new Error('SLACK_TOKEN must be set.')
    }
    const slackDriver = new SlackDriver(token);
    const postPort = new PostGateway(slackDriver)
    const usecase = new SendPostUsecaseByAnonymous(postPort)

    const query = qs.parse(event.body)
    const slackRequest = parseSlackRequest(query)
    try {
        await usecase.run(slackRequest.text, new ChannelId(slackRequest.channel_id), null)
        console.log('[END] ANONYMOUS POST');
        response = {
            'statusCode': 200,
            'body': '匿名による投稿がされました'
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

interface SlackRequest {
    token: string
    team_id: string
    team_domain: string
    channel_id: string
    channel_name: string
    user_id: string
    user_name: string
    text: string
    response_url: string
    trigger_id: string
}

function parseSlackRequest(query: ParsedUrlQuery): SlackRequest {
    return {
        token: query['token'].toString(),
        team_id: query['team_id'].toString(),
        team_domain: query['team_domain'].toString(),
        channel_id: query['channel_id'].toString(),
        channel_name: query['channel_name'].toString(),
        user_id: query['user_id'].toString(),
        user_name: query['user_name'].toString(),
        text: query['text'].toString(),
        response_url: query['response_url'].toString(),
        trigger_id: query['trigger_id'].toString()
    }
}
