import separatePinyinInSyllables from './helpers/separate-pinyin-in-syllables';

const defaultOptions = {
  byNbsp: false
};

const pinyinSeparate = (pinyIn, optionsArg = defaultOptions) => {
  let options = optionsArg;
  if (options !== defaultOptions) {
    // eslint-disable-next-line prefer-object-spread
    options = Object.assign({}, defaultOptions, options);
  }

  return separatePinyinInSyllables(pinyIn, options.byNbsp);
};

export default pinyinSeparate;

// export { pinyinSeparate };
