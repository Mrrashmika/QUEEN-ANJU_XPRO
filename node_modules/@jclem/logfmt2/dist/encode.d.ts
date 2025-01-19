export declare type Encodeable = {
    [key: string]: unknown;
};
export declare type EncodeOptions = {
    encodeKeys?: boolean;
};
/**
 * Encode an object into the logfmt format.
 *
 * The option object accepts an `encodeKeys` option. When `true`, the keys, in
 * addition to the values, of the object will be encoded. This is generally not
 * necessary, but useful the keys being encoded isn't known.
 */
export declare function encode(obj: Encodeable, opts?: EncodeOptions): string;
