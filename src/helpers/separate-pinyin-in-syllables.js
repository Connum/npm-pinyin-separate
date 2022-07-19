// @ts-check

const vowels = 'aāáǎăàeēéěĕèiīíǐĭìoōóǒŏòuūúǔŭùüǖǘǚǚü̆ǜvv̄v́v̆v̌v̀';
const tones = 'ā|á|ǎ|ă|à|ē|é|ě|ĕ|è|ī|í|ǐ|ĭ|ì|ō|ó|ǒ|ŏ|ò|ū|ú|ǔ|ŭ|ù|ǖ|ǘ|ǚ|ǚ|ü̆|ǜ|v̄|v́|v̆|v̌|v̀';
const initials = 'b|p|m|f|d|t|n|l|g|k|h|j|q|x|zh|ch|sh|r|z|c|s';
function separate(pinyin) {
  return (
    pinyin
      .replace(/'/g, ' ') // single quote used for separation
      .replace(new RegExp(`(${tones})(${tones})`, 'gi'), '$1 $2') // split two consecutive tones
      .replace(new RegExp(`([${vowels}])([^${vowels}nr])`, 'gi'), '$1 $2') // This line does most of the work
      .replace(new RegExp('(\\w)([csz]h)', 'gi'), '$1 $2') // double-consonant initials
      .replace(new RegExp(`([${vowels}]{2}(ng? )?)([^\\snr])`, 'gi'), '$1 $3') // double-vowel finals
      .replace(new RegExp(`([${vowels}]{2})(n[${vowels}])`, 'gi'), '$1 $2') // double-vowel followed by n initial
      .replace(new RegExp(`(n)([^${vowels}vg])`, 'gi'), '$1 $2') // cleans up most n compounds
      .replace(new RegExp(`((ch|sh|(y|b|p|m|f|d|t|n|l|j|q|x)i)(a|ā|á|ǎ|ă|à)) (o)`, 'gi'), '$1$5') // fix https://github.com/Connum/npm-pinyin-separate/issues/1
      .replace(new RegExp(`(w|gu|ku|hu|zhu|chu|shu)(a|ā|á|ǎ|ă|à) (i)`, 'gi'), '$1$2$3') // fix "i" being split from syllables ending in (u)ai
      .replace(new RegExp(`((a|ā|á|ǎ|ă|à)o)(${initials})`, 'gi'), '$1 $3') // fix syllable ending in ao followed by another syllable
      .replace(new RegExp(`((o|ō|ó|ǒ|ŏ|ò)u)(${initials})`, 'gi'), '$1 $3') // fix syllable ending in ou followed by another syllable
      .replace(new RegExp(`(y(u|ū|ú|ǔ|ŭ|ù|ü|ǖ|ǘ|ǚ|ǚ|ü̆|ǜ|v|v̄|v́|v̆|v̌|v̀))(n)(u|ū|ú|ǔ|ŭ|ù|ü|ǖ|ǘ|ǚ|ǚ|ü̆|ǜ|v|v̄|v́|v̆|v̌|v̀)`, 'gi'), '$1 $3$4') // fix two "u" (or "ü") separated by an "n" not being split
      .replace(
        new RegExp(
          '([' + vowels + 'v])([^' + vowels + '\\w\\s])([' + vowels + 'v])',
          'gi',
        ),
        '$1 $2$3',
      ) // assumes correct Pinyin (i.e., no missing apostrophes)
      .replace(
        new RegExp('([' + vowels + 'v])(n)(g)([' + vowels + 'v])', 'gi'),
        '$1$2 $3$4',
      ) // assumes correct Pinyin, i.e. changan = chan + gan
      .replace(new RegExp('([gr])([^' + vowels + '])', 'gi'), '$1 $2') // fixes -ng and -r finals not followed by vowels
      .replace(new RegExp('([^eēéěĕè\\w\\s])(r)', 'gi'), '$1 $2') // r an initial, except in er
      .replace(new RegExp('([^\\w\\s])([eēéěĕè]r)', 'gi'), '$1 $2') // er
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

  pinyinSeparated.forEach((p, i) => {
    let totalTones = 1;
    let pregMatch = p.match(new RegExp(`(${tones})`, 'g'));
    if (pregMatch) {
      totalTones = pregMatch.length;
    }

    if (p.length > 4 || totalTones > 1) {
      separate(p)
        .split(' ')
        .forEach(newP => {
          pregMatch = newP.match(new RegExp(`(${tones})`, 'g'));
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

