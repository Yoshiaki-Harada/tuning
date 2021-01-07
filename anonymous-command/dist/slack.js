"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.anonymousHandler = void 0;
var querystring_1 = __importDefault(require("querystring"));
var post_1 = require("./domain/post");
var slack_driver_1 = require("./driver/slack-driver");
var post_gateway_1 = require("./gateway/post-gateway");
var send_post_usecase_with_anonymous_1 = require("./usecase/send-post-usecase-with-anonymous");
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
function anonymousHandler(event, context, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var response, token, slackDriver, postPort, usecase, query, slackRequest, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    callback(null, { statusCode: 200, body: '投稿を受付ました' });
                    token = process.env.SLACK_TOKEN;
                    if (!token) {
                        throw new Error('SLACK_TOKEN must be set.');
                    }
                    slackDriver = new slack_driver_1.SlackDriver(token);
                    postPort = new post_gateway_1.PostGateway(slackDriver);
                    usecase = new send_post_usecase_with_anonymous_1.SendPostUsecaseWithAnonymous(postPort);
                    query = querystring_1.default.parse(event.body);
                    slackRequest = parseSlackRequest(query);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, usecase.run(slackRequest.text, new post_1.ChannelId(slackRequest.channel_id), null)];
                case 2:
                    _a.sent();
                    response = {
                        'statusCode': 200,
                        'body': '匿名による投稿がされました'
                    };
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [2 /*return*/, err_1];
                case 4: return [2 /*return*/, response];
            }
        });
    });
}
exports.anonymousHandler = anonymousHandler;
;
function parseSlackRequest(query) {
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
    };
}
