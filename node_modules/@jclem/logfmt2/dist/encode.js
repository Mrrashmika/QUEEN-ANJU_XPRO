"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = void 0;
/**
 * Encode an object into the logfmt format.
 *
 * The option object accepts an `encodeKeys` option. When `true`, the keys, in
 * addition to the values, of the object will be encoded. This is generally not
 * necessary, but useful the keys being encoded isn't known.
 */
function encode(obj, opts = {}) {
    let result = '';
    for (const key in obj) {
        const value = obj[key];
        let encodedValue = value;
        if (value == null) {
            encodedValue = '';
        }
        else {
            encodedValue = encodeString(String(value));
        }
        const keyString = opts.encodeKeys ? encodeString(key) : key;
        result += `${keyString}=${encodedValue} `;
    }
    return result.trim();
}
exports.encode = encode;
function encodeString(string) {
    if (string === '') {
        return '""';
    }
    let encoded = string.split(/\n/g).join(' ');
    if (/["\\]/.test(encoded))
        encoded = encoded.replace(/["\\]/g, '\\$&');
    if (/[\s=]/.test(encoded)) {
        encoded = `"${encoded}"`;
    }
    return encoded;
}
//# sourceMappingURL=encode.js.map