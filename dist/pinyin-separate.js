(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.pinyinSeparate = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:!0});var _separatePinyinInSyllables=require('pierophp-pinyin/shared/helpers/separate-pinyin-in-syllables'),_separatePinyinInSyllables2=_interopRequireDefault(_separatePinyinInSyllables);function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var defaultOptions={byNbsp:!1},pinyinSeparate=function(a){var b=1<arguments.length&&void 0!==arguments[1]?arguments[1]:defaultOptions,c=b;return c!==defaultOptions&&(c=Object.assign({},defaultOptions,c)),(0,_separatePinyinInSyllables2.default)(a,c.byNbsp)};exports.default=pinyinSeparate,module.exports=exports['default'];
},{"pierophp-pinyin/shared/helpers/separate-pinyin-in-syllables":2}],2:[function(require,module,exports){
// @ts-check

const vowels = 'aāáǎăàeēéěĕèiīíǐĭìoōóǒŏòuūúǔŭùüǖǘǚǚü̆ǜvv̄v́v̆v̌v̀';
const tones = 'āáǎăàēéěĕèīíǐĭìōóǒŏòūúǔŭùǖǘǚǚü̆ǜv̄v́v̆v̌v̀';
function separate(pinyin) {
  return (
    pinyin
      .replace(new RegExp(`([${vowels}])([^${vowels}nr])`, 'gi'), '$1 $2') // This line does most of the work
      .replace(new RegExp('(\w)([csz]h)', 'i'), '$1 $2') // double-consonant initials
      .replace(new RegExp(`(n)([^${vowels}vg])`, 'i'), '$1 $2') // cleans up most n compounds
      .replace(
        new RegExp(
          '([' + vowels + 'v])([^' + vowels + '\w\s])([' + vowels + 'v])',
          'i',
        ),
        '$1 $2$3',
      ) // assumes correct Pinyin (i.e., no missing apostrophes)
      .replace(
        new RegExp('([' + vowels + 'v])(n)(g)([' + vowels + 'v])', 'i'),
        '$1$2 $3$4',
      ) // assumes correct Pinyin, i.e. changan = chan + gan
      .replace(new RegExp('([gr])([^' + vowels + '])', 'i'), '$1 $2') // fixes -ng and -r finals not followed by vowels
      //.replace(new RegExp('([^e\w\s])(r)'), '$1 $2'); // r an initial, except in er
      .replace(/\s{2,}/g, ' ') // remove double-spaces
  );
}

module.exports = function separatePinyinInSyllables(pinyin, separateBySpaces) {
  if (!pinyin) {
    return [];
  }

  if (separateBySpaces) {
    return pinyin.split(String.fromCharCode(160));
  }

  const pinyinSeparated = separate(pinyin).split(' ');
  const newPinyin = [];

  pinyinSeparated.forEach(p => {
    let totalTones = 1;
    let pregMatch = p.match(new RegExp(`([${tones}])`, 'g'));
    if (pregMatch) {
      totalTones = pregMatch.length;
    }

    if (p.length > 4 || totalTones > 1) {
      separate(p)
        .split(' ')
        .forEach(newP => {
          pregMatch = newP.match(new RegExp(`([${tones}])`, 'g'));
          if (pregMatch) {
            totalTones = pregMatch.length;
          }

          if (newP.length > 4 || totalTones > 1) {
            separate(newP)
              .split(' ')
              .forEach(newP2 => {
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

},{}]},{},[1])(1)
});
