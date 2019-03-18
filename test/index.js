import { assert } from 'chai';
import pinyinSeparate from '../src';

describe('Default splitting tests', () => {
  it('should split jiānrěnbùbá', () => {
    const expectedVal = ['jiān', 'rěn', 'bù', 'bá'];
    assert.deepEqual(pinyinSeparate('jiānrěnbùbá'), expectedVal);
  });

  it('should split yīèrsānsìwǔliùqībājiǔshí', () => {
    const expectedVal = ['yī', 'èr', 'sān', 'sì', 'wǔ', 'liù', 'qī', 'bā', 'jiǔ', 'shí'];
    assert.deepEqual(pinyinSeparate('yīèrsānsìwǔliùqībājiǔshí'), expectedVal);
  });
  it('should split Wǒshìdéguórénxuéxízhōngwén', () => {
    const expectedVal = ['Wǒ', 'shì', 'dé', 'guó', 'rén', 'xué', 'xí', 'zhōng', 'wén'];
    assert.deepEqual(pinyinSeparate('Wǒshìdéguórénxuéxízhōngwén'), expectedVal);
  });

  it('should split Zhè shì wǒ de nǚér', () => {
    const expectedVal = ['Zhè', 'shì', 'wǒ', 'de', 'nǚ', 'ér'];
    assert.deepEqual(pinyinSeparate('Zhè shì wǒ de nǚér'), expectedVal);
  });

  it('should split Zhèerlǐ', () => {
    const expectedVal = ['Zhè', 'er', 'lǐ'];
    assert.deepEqual(pinyinSeparate('Zhèerlǐ'), expectedVal);
  });

  it('should split Zhèrlǐ', () => {
    const expectedVal = ['Zhèr', 'lǐ'];
    assert.deepEqual(pinyinSeparate('Zhèrlǐ'), expectedVal);
  });

  it('should split Zhèshìzhèerlǐ', () => {
    const expectedVal = ['Zhè', 'shì', 'zhè', 'er', 'lǐ'];
    assert.deepEqual(pinyinSeparate('Zhèshìzhèerlǐ'), expectedVal);
  });

  it('should split Zhèshì zhèerlǐ', () => {
    const expectedVal = ['Zhè', 'shì', 'zhè', 'er', 'lǐ'];
    assert.deepEqual(pinyinSeparate('Zhèshì zhèerlǐ'), expectedVal);
  });

  it('should split Zhèshìzhèrlǐ', () => {
    const expectedVal = ['Zhè', 'shì', 'zhèr', 'lǐ'];
    assert.deepEqual(pinyinSeparate('Zhèshìzhèrlǐ'), expectedVal);
  });

  it('should split Zhèshì zhèerlǐ', () => {
    const expectedVal = ['Zhè', 'shì', 'zhèr', 'lǐ'];
    assert.deepEqual(pinyinSeparate('Zhèshì zhèrlǐ'), expectedVal);
  });

  it('should split Qièěr', () => {
    const expectedVal = ['Qiè', 'ěr'];
    assert.deepEqual(pinyinSeparate('Qièěr'), expectedVal);
  });

  it('should split nüèjí', () => {
    const expectedVal = ['nüè', 'jí'];
    assert.deepEqual(pinyinSeparate('nüèjí'), expectedVal);
  });

  it('should split nĭhăoma using breve instead of háček for 3rd tone', () => {
    const expectedVal = ['nĭ', 'hăo', 'ma'];
    assert.deepEqual(pinyinSeparate('nĭhăoma'), expectedVal);
  });

  it('should split Wǒhěnhǎoxièxiènǐ\'ne', () => {
    const expectedVal = ['Wǒ', 'hěn', 'hǎo', 'xiè', 'xiè', 'nǐ', 'ne'];
    assert.deepEqual(pinyinSeparate("Wǒhěnhǎoxièxiènǐ'ne"), expectedVal);
  });

  it('should split Xián​\'ān', () => {
    const expectedVal = ['Xián', 'ān'];
    assert.deepEqual(pinyinSeparate('Xián\'ān'), expectedVal);
  });

  it('should split Xiànán', () => {
    const expectedVal = ['Xià', 'nán'];
    assert.deepEqual(pinyinSeparate('Xiànán'), expectedVal);
  });

  it('should split jiān rěn bù bá with non-breaking spaces', () => {
    const expectedVal = ['jiān', 'rěn', 'bù', 'bá'];
    const nbsp = String.fromCharCode(160);
    assert.deepEqual(pinyinSeparate(`jiān${nbsp}rěn${nbsp}bù${nbsp}bá`, {
      byNbsp: true
    }), expectedVal);
  });
});
