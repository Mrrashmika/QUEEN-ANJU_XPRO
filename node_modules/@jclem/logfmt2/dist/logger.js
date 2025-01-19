"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const encode_1 = require("./encode");
/**
 * An object with optional context state that logs to a stream
 */
class Logger {
    context;
    timers = {};
    stream;
    constructor({ stream, context } = {}) {
        this.stream = stream || process.stdout;
        this.context = context || {};
    }
    static log(data, opts = {}) {
        const stream = opts.stream || process.stdout;
        const encodedData = (0, encode_1.encode)(data);
        stream.write(`${encodedData}\n`);
    }
    /**
     * Append new data to the logger's context.
     */
    appendContext(newContext) {
        this.context = this.mergeContext(newContext);
    }
    /**
     * Log a message to the logger's stream.
     */
    log(data = {}) {
        const timersObj = this.getTimersState();
        const encodedData = (0, encode_1.encode)(this.mergeContext(timersObj, data));
        this.stream.write(`${encodedData}\n`);
    }
    /**
     * Log an error to the logger's stream.
     *
     * This will log separate lines for each line of the error's stack, and each
     * line will include a pseudorandom error ID to make reading logs easier.
     *
     * Note that this creates a new logger and immediately logs to this logger's
     * stream. Running timers, etc. are not included.
     */
    logError(error, data = {}) {
        const context = this.merge(this.context, data);
        const logger = new Logger({ stream: this.stream, context });
        const errorId = this.pseudorandomId();
        const errorContext = { error_id: errorId };
        const errorStack = error.stack ? error.stack.split('\n') : [];
        const headerLine = this.merge(errorContext, {
            name: error.name,
            message: error.message
        });
        const stackLines = errorStack.map(stackLine => {
            return this.merge(errorContext, { stackLine });
        });
        const lines = [headerLine, ...stackLines];
        lines.forEach(logger.log.bind(logger));
    }
    /**
     * Add a new timer to the logger.
     *
     * Timers are logged when `.log` is called.
     */
    time(label) {
        this.timers[label] = Date.now();
    }
    getTimersState() {
        const now = Date.now();
        const timers = {};
        for (const key in this.timers) {
            timers[key] = now - this.timers[key];
        }
        return timers;
    }
    merge(...data) {
        return Object.assign({}, ...data);
    }
    mergeContext(...data) {
        return Object.assign({}, this.context, ...data);
    }
    pseudorandomId() {
        return Math.floor(Math.random() * 1000000000);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map