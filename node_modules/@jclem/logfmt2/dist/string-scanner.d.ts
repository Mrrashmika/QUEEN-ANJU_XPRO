/**
 * Scans over a string, character by character
 */
export default class StringScanner {
    private readonly data;
    pos: number;
    constructor(data: string);
    /**
     * Fetch the next character.
     */
    next(): string | undefined;
    /**
     * Peek at the next character.
     */
    peek(): string | undefined;
    /**
     * Rewind the position by 1.
     */
    rewind(): void;
}
