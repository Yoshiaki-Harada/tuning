"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var ts_mock_imports_1 = require("ts-mock-imports");
var post_gateway_1 = require("../../gateway/post-gateway");
var send_post_usecase_with_anonymous_1 = require("../../usecase/send-post-usecase-with-anonymous");
var driverModule = __importStar(require("../../driver/slack-driver"));
var post_1 = require("../../domain/post");
var sinon = __importStar(require("sinon"));
var emoji_1 = require("../../domain/emoji");
describe('匿名でポストするテスト', function () {
    it('threadIdがある場合はリプライする', function () { return __awaiter(void 0, void 0, void 0, function () {
        var mockManager, gateway, usecase, originalText, text, channelId, threadId, mock, postId, emojis;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    mockManager = ts_mock_imports_1.ImportMock.mockClass(driverModule, 'SlackDriver');
                    gateway = new post_gateway_1.PostGateway(mockManager.getMockInstance());
                    usecase = new send_post_usecase_with_anonymous_1.SendPostUsecaseWithAnonymous(gateway);
                    originalText = 'テスト stamp=[:ok:]';
                    text = new post_1.Text('テスト');
                    channelId = new post_1.ChannelId('ch1');
                    threadId = new post_1.ThreadId('th2');
                    mock = sinon.mock(gateway);
                    postId = new post_1.PostId(channelId, new post_1.ThreadId('tid2'));
                    emojis = new emoji_1.Emojis([new emoji_1.Emoji('ok')]);
                    mock.expects('reply').once().withArgs(new post_1.Reply(text, emojis, channelId, threadId)).returns(postId);
                    mock.expects('addEmoji').once().withArgs(postId, emojis);
                    return [4 /*yield*/, usecase.run(originalText, channelId, threadId)];
                case 1:
                    _a.sent();
                    mock.verify();
                    return [2 /*return*/];
            }
        });
    }); }),
        it('threadIdがある場合はチャンネルにポストする', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockManager, gateway, usecase, originalText, text, channelId, mock, postId, emojis;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockManager = ts_mock_imports_1.ImportMock.mockClass(driverModule, 'SlackDriver');
                        gateway = new post_gateway_1.PostGateway(mockManager.getMockInstance());
                        usecase = new send_post_usecase_with_anonymous_1.SendPostUsecaseWithAnonymous(gateway);
                        originalText = 'テスト stamp=[:ok:]';
                        text = new post_1.Text('テスト');
                        channelId = new post_1.ChannelId('ch1');
                        mock = sinon.mock(gateway);
                        postId = new post_1.PostId(channelId, new post_1.ThreadId('tid2'));
                        emojis = new emoji_1.Emojis([new emoji_1.Emoji('ok')]);
                        mock.expects('send').once().withArgs(new post_1.Post(text, emojis, channelId)).returns(postId);
                        mock.expects('addEmoji').once().withArgs(postId, emojis);
                        return [4 /*yield*/, usecase.run(originalText, channelId, null)];
                    case 1:
                        _a.sent();
                        mock.verify();
                        return [2 /*return*/];
                }
            });
        }); });
});
