# logfmt2

[![](https://github.com/jclem/logfmt2/workflows/Test%20%26%20Benchmark/badge.svg)](https://github.com/jclem/logfmt2/actions)

logfmt2 (which is based on the original [logfmt](https://github.com/csquared/node-logfmt) and the original [blog post](https://brandur.org/logfmt)) is a module for encoding objects into the logfmt format and decoding them again.

## Install

```
npm install @jclem/logfmt2
```

## Build

```
script/build
```

## Publish

The `script/publish` script cleans the build directory, builds the project, and then runs `npm publish`.

```
script/publish
```

## Usage

```javascript
const {Logger, encode, decode} = require('@jclem/logfmt2')

console.log(encode({foo: 'bar'})) // foo=bar
console.log(decode('foo=bar')) // {foo: 'bar'}

// Use the static `Logger.log` to stdout
Logger.log({foo: 'bar'}) // logs "foo=bar"

// Create a logger to maintain a logging context
const logger = new Logger({ns: 'my-app'})
logger.log({foo: 'bar'}) // logs "ns=my-app foo=bar"

// Add timers
logger.time('elapsedMs')
// Wait 50ms
logger.log({foo: 'bar'}) // logs "ns=my-app elapsedMs=50 foo=bar"
// Wait 50ms
logger.log({foo: 'bar'}) // logs "ns=my-app elapsedMs=100 foo=bar"

// Add (mutate) the logger context
logger.appendContext({new_context: 'hello'})
logger.log({foo: 'bar'}) // logs "ns=my-app new_context=hello elapsedMs=100 foo=bar"
```
