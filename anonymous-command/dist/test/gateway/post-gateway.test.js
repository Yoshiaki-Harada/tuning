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
var slack_driver_1 = require("../../driver/slack-driver");
var post_gateway_1 = require("../../gateway/post-gateway");
var post_1 = require("../../domain/post");
var emoji_1 = require("../../domain/emoji");
var sinon = __importStar(require("sinon"));
var chai_1 = require("chai");
describe('PostGateway.addEmojisのテスト', function () {
    it('絵文字の追加でdriverがEmojiの個数分呼ばれる', function () { return __awaiter(void 0, void 0, void 0, function () {
        var driver, mock, postGateway, emojis;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driver = new slack_driver_1.SlackDriver('');
                    mock = sinon.mock(driver);
                    postGateway = new post_gateway_1.PostGateway(driver);
                    emojis = new emoji_1.Emojis([new emoji_1.Emoji('ok'), new emoji_1.Emoji('bad')]);
                    mock.expects('addReaction').twice();
                    return [4 /*yield*/, postGateway.addEmoji(new post_1.PostId(new post_1.ChannelId(''), new post_1.ThreadId('')), emojis)];
                case 1:
                    _a.sent();
                    mock.verify();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('PostGateway.sendのテスト', function () {
    it('driverのsendを呼びpostIdを返す', function () { return __awaiter(void 0, void 0, void 0, function () {
        var driver, mock, postGateway, res, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driver = new slack_driver_1.SlackDriver('');
                    mock = sinon.mock(driver);
                    postGateway = new post_gateway_1.PostGateway(driver);
                    res = { channel: 'cid', ts: 'tid2', message: { text: '' }, ok: true };
                    mock.expects('post').once().withArgs('text', 'cid').returns(res);
                    return [4 /*yield*/, postGateway.send(new post_1.Post(new post_1.Text('text'), new emoji_1.Emojis([]), new post_1.ChannelId('cid')))];
                case 1:
                    result = _a.sent();
                    chai_1.expect(result).to.deep.equal(new post_1.PostId(new post_1.ChannelId('cid'), new post_1.ThreadId('tid2')));
                    mock.verify();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('PostGateway.replyのテスト', function () {
    it('driverのreplyを呼びpostIdを返す', function () { return __awaiter(void 0, void 0, void 0, function () {
        var driver, mock, postGateway, res, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    driver = new slack_driver_1.SlackDriver('');
                    mock = sinon.mock(driver);
                    postGateway = new post_gateway_1.PostGateway(driver);
                    res = { channel: 'cid', ts: 'tid2', message: { text: '' }, ok: true };
                    mock.expects('reply').once().withArgs('text', 'cid').returns(res);
                    return [4 /*yield*/, postGateway.reply(new post_1.Reply(new post_1.Text('text'), new emoji_1.Emojis([]), new post_1.ChannelId('cid'), new post_1.ThreadId('tid')))];
                case 1:
                    result = _a.sent();
                    chai_1.expect(result).to.deep.equal(new post_1.PostId(new post_1.ChannelId('cid'), new post_1.ThreadId('tid2')));
                    mock.verify();
                    return [2 /*return*/];
            }
        });
    }); });
});
