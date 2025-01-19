<div align="center">
  <img src="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner.png#gh-light-mode-only" alt="microlink cdn">
  <img src="https://github.com/microlinkhq/cdn/raw/master/dist/logo/banner-dark.png#gh-dark-mode-only" alt="microlink cdn">
  <br>
  <br>
</div>

![Last version](https://img.shields.io/github/tag/microlinkhq/tinyspawn.svg?style=flat-square)
[![Coverage Status](https://img.shields.io/coveralls/microlinkhq/tinyspawn.svg?style=flat-square)](https://coveralls.io/github/microlinkhq/tinyspawn)
[![NPM Status](https://img.shields.io/npm/dm/tinyspawn.svg?style=flat-square)](https://www.npmjs.org/package/tinyspawn)

**tinyspawn** is a minimalistic [`child_process`](https://nodejs.org/api/child_process.html) wrapper with following features:

- Small (~80 LOC, 835 bytes).
- Focus on performance.
- Zero dependencies.
- Meaningful errors.
- Easy to extend.
- Fully typed.

## Install

```bash
$ npm install tinyspawn --save
```

## Usage

### Getting started

The [child_process](https://nodejs.org/api/child_process.html) in Node.js is great, but I always found the API confusing and hard to remember.

That's why I created **tinyspawn**. It's recommended to bind it to `$`:

```js
const $ = require('tinyspawn')
```

The first argument is the command (with arguments) to be executed:

```js
const { stdout } = await $(`node -e 'console.log("hello world")'`)
console.log(stdout) // => 'hello world'
```

The second argument is any of the [spawn#options](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options):

```js
const { stdout } = $(`node -e 'console.log("hello world")'`, {
  shell: true
})
```

When you execute a command, it returns a [ChildProcess](https://nodejs.org/api/child_process.html#class-childprocess) instance:

```js
const {
  signalCode,
  exitCode,
  killed,
  spawnfile,
  spawnargs,
  pid,
  stdin,
  stdout,
  stderr,
  stdin
} = await $('date')
```

### Piping streams

Since **tinyspawn** returns a [ChildProcess](https://nodejs.org/api/child_process.html#class-childprocess) instance, you can use it for interacting with other Node.js streams:

```js
const subprocess = $('echo 1234567890')
subprocess.stdout.pipe(process.stdout) // => 1234567890

/* You can also continue interacting with it as a promise */

const { stdout } = await subprocess
console.log(stdout) // => 1234567890
```

or stdin:

```js
const { Readable } = require('node:stream')

const subprocess = $('cat', { stdin: 'hello world' })
Readable.from('hello world').pipe(subprocess.stdin)
const {stdout} = await subprocess

console.log(stdout) // 'hello world'
```

### JSON parsing

A CLI program commonly supports a way to return a JSON that makes it easy to connect with other programs.

**tinyspawn** has been designed to be easy to work with CLI programs, making it possible to call `$.json` or pass `{ json: true }` as an option:

```js
const { stdout } = await $.json(`curl https://geolocation.microlink.io`)
```

### Extending behavior

Although you can pass [spawn#options](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options) as a second argument, sometimes defining something as default behavior is convenient.

**tinyspawn** exports the method `$.extend` to create a tinyspawn with [spawn#options](https://nodejs.org/api/child_process.html#child_processspawncommand-args-options) defaults set:

```js
const $ = require('tinyspawn').extend({
  timeout: 5000,
  killSignal: 'SIGKILL'
})
```

### Meaningful errors

When working with CLI programs and something wrong happens, it's crucial to present the error as readable as possible.

**tinyspawn** prints meaningful errors to help you understa dn what happened:

```js
const subprocess = $('node', ['child.js'], {
  timeout: 500,
  killSignal: 'SIGKILL'
})

console.log(await subprocess.catch(error => error))
// Error [ChildProcessError]: The command spawned as:

//   `node child.js`

// exited with:

//   `{ signal: 'null', code: 1 }`

// with the following trace:

//     at createChildProcessError (/Users/kikobeats/Projects/microlink/tinyspawn/src/index.js:20:17)
//     at ChildProcess.<anonymous> (/Users/kikobeats/Projects/microlink/tinyspawn/src/index.js:63:18)
//     at ChildProcess.emit (node:events:531:35)
//     at ChildProcess._handle.onexit (node:internal/child_process:294:12) {
//   command: 'node child.js',
//   connected: false,
//   signalCode: null,
//   exitCode: 1,
//   killed: false,
//   spawnfile: 'node',
//   spawnargs: [ 'node', 'child.js' ],
//   pid: 63467,
//   stdout: '',
//   stderr: 'node:internal/modules/cjs/loader:1148\n' +
//     '  throw err;\n' +
//     '  ^\n' +
//     '\n' +
//     "Error: Cannot find module '/Users/kikobeats/Projects/microlink/tinyspawn/child.js'\n" +
//     '    at Module._resolveFilename (node:internal/modules/cjs/loader:1145:15)\n' +
//     '    at Module._load (node:internal/modules/cjs/loader:986:27)\n' +
//     '    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:174:12)\n' +
//     '    at node:internal/main/run_main_module:28:49 {\n' +
//     "  code: 'MODULE_NOT_FOUND',\n" +
//     '  requireStack: []\n' +
//     '}\n' +
//     '\n' +
//     'Node.js v20.15.1'
// }
```

The [ChildProcess](https://nodejs.org/api/child_process.html#class-childprocess) instance properties are also available as part of the error:

```js
const { stdout: node } = await $('which node')

const error = await $(`${node} -e 'require("notfound")'`).catch(error => error)

const {
  signalCode,
  exitCode,
  killed,
  spawnfile,
  spawnargs,
  pid,
  stdin,
  stdout,
  stderr,
  stdin
} = error
```

## Related

- [tinyrun](https://github.com/Kikobeats/tinyrun) – CLI for executing multiple commands in parallel with minimal footprint (~2KB).

## License

**tinyspawn** © [microlink.io](https://microlink.io), released under the [MIT](https://github.com/microlinkhq/tinyspawn/blob/master/LICENSE.md) License.<br>
Authored and maintained by [Kiko Beats](https://kikobeats.com) with help from [contributors](https://github.com/microlinkhq/tinyspawn/contributors).

> [microlink.io](https://microlink.io) · GitHub [microlink.io](https://github.com/microlinkhq) · X [@microlinkhq](https://x.com/microlinkhq)
