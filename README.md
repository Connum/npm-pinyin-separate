# NPM pinyin-separate

[![dependencies Status](https://david-dm.org/Connum/npm-pinyin-separate/status.svg)](https://david-dm.org/Connum/npm-pinyin-separate) [![devDependencies Status](https://david-dm.org/Connum/npm-pinyin-separate/dev-status.svg)](https://david-dm.org/Connum/npm-pinyin-separate?type=dev) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Separates a string containing pinyin notation (with diacritics) into an array of pinyin syllables, even if there are no spaces in between.

This is mainly [separate-pinyin-in-syllables.js](https://github.com/pierophp/pinyin/blob/master/shared/helpers/separate-pinyin-in-syllables.js) turned into an npm module, but I made some fixes and extended it to allow "vv̄v́v̆v̀" in addition to "üǖǘǚǜ" as well, so I use [my own fork](https://github.com/Connum/pinyin) as the base for this module.

# Installation
`npm install pinyin-separate`

# Usage and examples
```js
const pinyinSeparate = require('pinyin-separate').default
// or
import pinyinSeparate from 'pinyin-separate'
// or (for usage in a browser environment)
<script src="dist/pinyin-separate.js"></script>

// and then it's as simple as
pinyinSeparate("nĭhăoma"); // result: ['nĭ', 'hăo', 'ma']

// if the syllables in your input string are separated by
// non-breaking spaces (charcode 160), you can set the option "byNbsp"
// to true; that will simply split the string by that character
// without any further splitting/processing. This is a remnant from
// the original lib (second argument of the main function) and probably
// not very useful on its own, but I decided to keep it in for compatibility
pinyinSeparate("jiān rěn bù bá", { // non-breaking spaces!
    byNbsp: true
}) // result: ['jiān', 'rěn', 'bù', 'bá']
```

## Options
An optional options object can be passed as a second argument.

| Option Name  | Default | Description |
| ------------- | ------------- | ------------- |
| `byNbsp`  | `false`  | Split input string by charcode 160 (non-breaking space) without any further processing (see explanation in the code example above) |

# Development Commands
- `npm run clean` - Remove `lib/` directory
- `npm test` - Run tests with linting
- `npm test:only` - Run tests without linting
- `npm test:watch` - Re-run tests on file changes
- `npm test:prod` - Run tests with minified code
- `npm run test:examples` - Test examples with node
- `npm run lint` - Run ESlint with airbnb-config
- `npm run build` - Babel will transpile ES6 => ES5 and minify the code, Browserify will create a bundle in `dist/` for in-browser usage.
- `npm run prepublish` - Hook for npm. Do all the checks before publishing the module.

# License

MIT © Connum

based on [flexdinesh/npm-module-boilerplate](https://github.com/flexdinesh/npm-module-boilerplate), MIT © Dinesh Pandiyan
and [separate-pinyin-in-syllables.js](https://github.com/pierophp/pinyin/blob/master/shared/helpers/separate-pinyin-in-syllables.js), MIT © GitHub user pierophp