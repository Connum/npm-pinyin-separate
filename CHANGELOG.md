# Changelog

## [1.0.8] - 2022-07-19

### Added
* Changelog
* More tests

### Changed
* Removed helper separate-pinyin-in-syllables.js from .gitignore, which prevented anyone from doing their own build

### Fixed
* Syllables ending in ao or ou were not split from a following syllable
* "i" was being split from syllables ending in (u)ai
* two "u" (or "ü") separated by an "n" were not being split

## [1.0.7] - 2022-07-19

### Fixed
* The "o" was incorrectly split from the syllables chao, piao, shao, xiao ([Issue #1](https://github.com/Connum/npm-pinyin-separate/issues/1))

[1.0.8]: https://github.com/Connum/npm-pinyin-separate/compare/1.0.7...1.0.8
[1.0.7]: https://github.com/Connum/npm-pinyin-separate/compare/1.0.6...1.0.7
