/*!
 * pinyin-separate v1.0.6 (July 19th 2019)
 * Separates a string containing pinyin notation (with diacritics) into an array of pinyin syllables, even if there are no spaces in between.
 * 
 * https://github.com/Connum/npm-pinyin-separate#readme
 * 
 * @author  Connum <connum@gmail.com>
 * @license MIT
 */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pinyinSeparate = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

// @ts-check

var vowels = 'aāáǎăàeēéěĕèiīíǐĭìoōóǒŏòuūúǔŭùüǖǘǚǚü̆ǜvv̄v́v̆v̌v̀';
var tones = 'āáǎăàēéěĕèīíǐĭìōóǒŏòūúǔŭùǖǘǚǚü̆ǜv̄v́v̆v̌v̀';
function separate(pinyin) {
  return pinyin.replace(/'/g, ' ') // single quote used for separation
  .replace(new RegExp('([' + vowels + '])([^' + vowels + 'nr])', 'gi'), '$1 $2') // This line does most of the work
  .replace(new RegExp('(\\w)([csz]h)', 'gi'), '$1 $2') // double-consonant initials
  .replace(new RegExp('([' + vowels + ']{2}(ng? )?)([^\\snr])', 'gi'), '$1 $3') // double-vowel finals
  .replace(new RegExp('([' + vowels + ']{2})(n[' + vowels + '])', 'gi'), '$1 $2') // double-vowel followed by n initial
  .replace(new RegExp('(n)([^' + vowels + 'vg])', 'gi'), '$1 $2') // cleans up most n compounds
  .replace(new RegExp('([' + vowels + 'v])([^' + vowels + '\\w\\s])([' + vowels + 'v])', 'gi'), '$1 $2$3') // assumes correct Pinyin (i.e., no missing apostrophes)
  .replace(new RegExp('([' + vowels + 'v])(n)(g)([' + vowels + 'v])', 'gi'), '$1$2 $3$4') // assumes correct Pinyin, i.e. changan = chan + gan
  .replace(new RegExp('([gr])([^' + vowels + '])', 'gi'), '$1 $2') // fixes -ng and -r finals not followed by vowels
  .replace(new RegExp('([^eēéěĕè\\w\\s])(r)', 'gi'), '$1 $2') // r an initial, except in er
  .replace(new RegExp('([^\\w\\s])([eēéěĕè]r)', 'gi'), '$1 $2') // er
  .replace(/\s{2,}/g, ' ') // remove double-spaces
  ;
}

module.exports = function separatePinyinInSyllables(pinyin, separateBySpaces) {
  if (!pinyin) {
    return [];
  }

  if (separateBySpaces) {
    return pinyin.split(String.fromCharCode(160));
  }

  var pinyinSeparated = separate(pinyin).split(' ');
  var newPinyin = [];

  pinyinSeparated.forEach(function (p) {
    var totalTones = 1;
    var pregMatch = p.match(new RegExp('([' + tones + '])', 'g'));
    if (pregMatch) {
      totalTones = pregMatch.length;
    }

    if (p.length > 4 || totalTones > 1) {
      separate(p).split(' ').forEach(function (newP) {
        pregMatch = newP.match(new RegExp('([' + tones + '])', 'g'));
        if (pregMatch) {
          totalTones = pregMatch.length;
        }

        if (newP.length > 4 || totalTones > 1) {
          separate(newP).split(' ').forEach(function (newP2) {
            newPinyin.push(newP2.trim());
          });
        } else {
          newPinyin.push(newP.trim());
        }
      });
    } else {
      newPinyin.push(p.trim());
    }
  });

  return newPinyin;
};
},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _separatePinyinInSyllables = require('./helpers/separate-pinyin-in-syllables');

var _separatePinyinInSyllables2 = _interopRequireDefault(_separatePinyinInSyllables);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {
  byNbsp: false
};

var pinyinSeparate = function pinyinSeparate(pinyIn) {
  var optionsArg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;

  var options = optionsArg;
  if (options !== defaultOptions) {
    options = Object.assign({}, defaultOptions, options);
  }

  return (0, _separatePinyinInSyllables2.default)(pinyIn, options.byNbsp);
};

exports.default = pinyinSeparate;

// export { pinyinSeparate };

module.exports = exports.default;
},{"./helpers/separate-pinyin-in-syllables":1}]},{},[2])(2)
});
