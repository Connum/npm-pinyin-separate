import { assert } from 'chai';
import pinyinSeparate from '../src';

describe('Default splitting tests', () => {
  it('should split jiānrěnbùbá', () => {
    const expectedVal = ['jiān', 'rěn', 'bù' , 'bá']
    assert.deepEqual(pinyinSeparate('jiānrěnbùbá'), expectedVal);
  });
  
  it('should split nĭhăoma using breve instead of háček for 3rd tone', () => {
    const expectedVal = ['nĭ', 'hăo', 'ma' ]
    assert.deepEqual(pinyinSeparate('nĭhăoma'), expectedVal);
  });

  it('should split jiān rěn bù bá with non-breaking spaces', () => {
    const expectedVal = ['jiān', 'rěn', 'bù' , 'bá']
    const nbsp = String.fromCharCode(160)
    assert.deepEqual(pinyinSeparate(`jiān${nbsp}rěn${nbsp}bù${nbsp}bá`, {
      byNbsp: true
    }), expectedVal);
  });
});
