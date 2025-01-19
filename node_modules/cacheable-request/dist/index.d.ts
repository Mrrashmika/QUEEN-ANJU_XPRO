import { RequestFn, StorageAdapter, CacheResponse, CacheValue, CacheableOptions, Emitter } from './types.js';
type Function_ = (...arguments_: any[]) => any;
declare class CacheableRequest {
    cache: StorageAdapter;
    cacheRequest: RequestFn;
    hooks: Map<string, Function_>;
    constructor(cacheRequest: RequestFn, cacheAdapter?: StorageAdapter | string);
    request: () => (options: CacheableOptions, callback?: (response: CacheResponse) => void) => Emitter;
    addHook: (name: string, function_: Function_) => void;
    removeHook: (name: string) => boolean;
    getHook: (name: string) => Function_;
    runHook: (name: string, ...arguments_: any[]) => Promise<CacheValue>;
}
export default CacheableRequest;
export * from './types.js';
export declare const onResponse = "onResponse";
//# sourceMappingURL=index.d.ts.map