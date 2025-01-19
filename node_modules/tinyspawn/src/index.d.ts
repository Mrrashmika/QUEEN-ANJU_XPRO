import { ChildProcess, SpawnOptions } from 'child_process';

interface ExtendOptions extends SpawnOptions {
  json?: boolean;
}

interface ResolvedSubprocess extends Omit<ChildProcess, 'stdout' | 'stderr'> {
  stdout: string;
  stderr: string;
}

export interface SubprocessPromise extends Promise<ResolvedSubprocess>, ChildProcess {}

declare function extend(defaults?: ExtendOptions): (input: string, args?: (string | false | null | undefined)[] | ExtendOptions, options?: ExtendOptions) => SubprocessPromise;

declare const $: ReturnType<typeof extend> & {
  extend: typeof extend;
  json: ReturnType<typeof extend>;
};

export default $;
