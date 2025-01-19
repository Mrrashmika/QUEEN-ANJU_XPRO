"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const string_scanner_1 = __importDefault(require("./string-scanner"));
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Key"] = 0] = "Key";
    TokenType[TokenType["Value"] = 1] = "Value";
    TokenType[TokenType["Garbage"] = 2] = "Garbage";
})(TokenType || (TokenType = {}));
/**
 * Decode a logfmt line into an object.
 */
function decode(line) {
    const decoded = {};
    const scanner = new string_scanner_1.default(line);
    let tokenType = TokenType.Garbage;
    let ch;
    let key = '';
    let value = '';
    while ((ch = scanner.next())) {
        switch (tokenType) {
            case TokenType.Garbage:
                if (ch === ' ') {
                    continue;
                }
                tokenType = TokenType.Key;
                scanner.rewind();
                break;
            case TokenType.Key:
                key = consumeString(ch, scanner);
                tokenType = TokenType.Value;
                break;
            case TokenType.Value:
                value = consumeString(ch, scanner);
                decoded[key] = value;
                tokenType = TokenType.Garbage;
        }
    }
    return decoded;
}
exports.decode = decode;
function consumeString(init, scanner) {
    let string = '';
    let inQuote = false;
    let inEscape = false;
    let ch = init;
    while (ch) {
        const wasEscaping = inEscape;
        inEscape = false;
        if (ch === ' ' && !inQuote) {
            break;
        }
        if (ch === '=' && !inQuote && !wasEscaping) {
            break;
        }
        if (ch === '"' && !wasEscaping) {
            inQuote = !inQuote;
            ch = scanner.next();
            continue;
        }
        if (ch === '\\' && !wasEscaping) {
            inEscape = true;
            ch = scanner.next();
            continue;
        }
        string += ch;
        ch = scanner.next();
    }
    return string;
}
//# sourceMappingURL=decode.js.map