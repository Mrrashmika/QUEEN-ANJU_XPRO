/// <reference types="node" />
import { Encodeable } from '.';
declare type LoggerOpts = {
    stream?: NodeJS.WritableStream;
    context?: Encodeable;
};
/**
 * An object with optional context state that logs to a stream
 */
export declare class Logger {
    private context;
    private timers;
    private readonly stream;
    constructor({ stream, context }?: LoggerOpts);
    static log(data: Encodeable, opts?: {
        stream?: NodeJS.WritableStream;
    }): void;
    /**
     * Append new data to the logger's context.
     */
    appendContext(newContext: Encodeable): void;
    /**
     * Log a message to the logger's stream.
     */
    log(data?: Encodeable): void;
    /**
     * Log an error to the logger's stream.
     *
     * This will log separate lines for each line of the error's stack, and each
     * line will include a pseudorandom error ID to make reading logs easier.
     *
     * Note that this creates a new logger and immediately logs to this logger's
     * stream. Running timers, etc. are not included.
     */
    logError(error: Error, data?: Encodeable): void;
    /**
     * Add a new timer to the logger.
     *
     * Timers are logged when `.log` is called.
     */
    time(label: string): void;
    private getTimersState;
    private merge;
    private mergeContext;
    private pseudorandomId;
}
export {};
