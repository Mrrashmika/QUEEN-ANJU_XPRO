"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Scans over a string, character by character
 */
class StringScanner {
    data;
    constructor(data) {
        this.data = data;
        this.pos = 0;
    }
    /**
     * Fetch the next character.
     */
    next() {
        return this.data[this.pos++];
    }
    /**
     * Peek at the next character.
     */
    peek() {
        return this.data[this.pos + 1];
    }
    /**
     * Rewind the position by 1.
     */
    rewind() {
        const newPos = this.pos - 1;
        this.pos = newPos < 0 ? 0 : newPos;
    }
}
exports.default = StringScanner;
//# sourceMappingURL=string-scanner.js.map