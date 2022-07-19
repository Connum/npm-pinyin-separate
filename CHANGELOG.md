# Changelog

## [1.1.0] - 2022-07-19

### Added
* Changelog
* More tests

### Changed
* Removed helper separate-pinyin-in-syllables.js from .gitignore and stopped loading it via napa, which failed and prevented anyone from doing their own build
* log a test call to pinyinSeparate() to the console in test/test_bundle.html
* updated all dependencies except eslint and eslint-config-airbnb due to major changes

### Fixed
* Syllables ending in ao or ou were not split from a following syllable
* "i" was being split from syllables ending in (u)ai
* two "u" (or "ü") separated by an "n" were not being split

## [1.0.7] - 2022-07-19

### Fixed
* The "o" was incorrectly split from the syllables chao, piao, shao, xiao ([Issue #1](https://github.com/Connum/npm-pinyin-separate/issues/1))

[1.1.0]: https://github.com/Connum/npm-pinyin-separate/compare/1.0.7...1.1.0
[1.0.7]: https://github.com/Connum/npm-pinyin-separate/compare/1.0.6...1.0.7
