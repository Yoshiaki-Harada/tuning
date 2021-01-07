"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEmojis = exports.Emoji = exports.Emojis = void 0;
var Emojis = /** @class */ (function () {
    function Emojis(list) {
        this.list = list;
    }
    return Emojis;
}());
exports.Emojis = Emojis;
var Emoji = /** @class */ (function () {
    function Emoji(value) {
        this.value = value;
    }
    return Emoji;
}());
exports.Emoji = Emoji;
function createEmojis(originalText) {
    var _a;
    var regex = new RegExp(/stamp=\[.*\]/g);
    var regex2 = new RegExp(/:(.*):/g);
    var result = (_a = regex.exec(originalText)) === null || _a === void 0 ? void 0 : _a.toString().replace('[', '').replace(']', '').split(' ').map(function (text) { return text.match(regex2); }).filter(function (result) { return result !== null; }).map(function (result) {
        var text = result.toString();
        return text.substring(1, text.length - 1);
    }).map(function (text) { return new Emoji(text); });
    return result ? new Emojis(result) : new Emojis([]);
}
exports.createEmojis = createEmojis;
