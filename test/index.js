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

  it('should split piàoliàng correctly', () => {
    const expectedVal = ['piào', 'liàng'];
    assert.deepEqual(pinyinSeparate('piàoliàng'), expectedVal);
  });

  it('should split cháo xiào correctly', () => {
    const expectedVal = ['cháo', 'xiào'];
    assert.deepEqual(pinyinSeparate('cháo xiào'), expectedVal);
  });

  it('should split xióngmāohěnkěài', () => {
    const expectedVal = ['xióng', 'māo', 'hěn', 'kě', 'ài'];
    assert.deepEqual(pinyinSeparate('xióngmāohěnkěài'), expectedVal);
  });

  it('should split Duìbùqǐ wǒ de zhōngwén bù hǎo', () => {
    const expectedVal = ['Duì', 'bù', 'qǐ', 'wǒ', 'de', 'zhōng', 'wén', 'bù', 'hǎo'];
    assert.deepEqual(pinyinSeparate('Duìbùqǐ wǒ de zhōngwén bù hǎo'), expectedVal);
  });

  it('should split Nǐ zuìjìn zěnme yàng', () => {
    const expectedVal = ['Nǐ', 'zuì', 'jìn', 'zěn', 'me', 'yàng'];
    assert.deepEqual(pinyinSeparate('Nǐ zuìjìn zěnme yàng'), expectedVal);
  });

  it('should split yundongyuan', () => {
    const expectedVal = ['yun', 'dong', 'yuan'];
    assert.deepEqual(pinyinSeparate('yundongyuan'), expectedVal);
  });

  it('should split yùndòngyuán', () => {
    const expectedVal = ['yùn', 'dòng', 'yuán'];
    assert.deepEqual(pinyinSeparate('yùndòngyuán'), expectedVal);
  });

  const combinations = [
    'ei pei mei fei dei tei nei lei gei kei hei zhei shei zei cei sei',
    'ai bai pai mai dai tai nai lai gai kai hai zhai chai shai zai cai sai',
    'ao bao pao mao dao tao nao lao gao kao hao zhao chao shao rao zao cao sao',
    'ou pou mou fou dou tou nou lou gou kou hou zhou chou shou rou zou cou sou',
    'an ban pan man fan dan tan nan lan gan kan han zhan chan shan ran zan can san',
    'en ben pen men fen den nen gen ken hen zhen chen shen ren zen cen sen',
    'ang bang pang mang fang dang tang nang lang gang kang hang zhang chang shang rang zang cang sang',
    'eng beng peng meng feng deng teng neng leng geng keng heng zheng cheng sheng reng zeng ceng seng',
    'dong tong nong long gong kong hong zhong chong rong zong cong song',
    'ya pia dia nia lia jia qia xia',
    'ye bie pie mie die tie nie lie jie qie xie',
    'yao biao piao miao fiao diao tiao niao liao jiao qiao xiao',
    'you miu diu niu liu kiu jiu qiu xiu',
    'yan bian pian mian dian tian nian lian jian qian xian',
    'yin bin pin min nin lin jin qin xin',
    'yang biang diang niang liang jiang qiang xiang',
    'ying bing ping ming ding ting ning ling jing qing xing',
    'yong jiong qiong xiong',
    'wa gua kua hua zhua chua shua rua',
    'wo duo tuo nuo luo guo kuo huo zhuo chuo shuo ruo zuo cuo suo',
    'wài guài kuài huài zhuài chuài shuài',
    'wei dui tui gui kui hui zhui chui shui rui zui cui sui',
    'wan duan tuan nuan luan guan kuan huan zhuan chuan shuan ruan zuan cuan suan',
    'wen dun tun nun lun gun kun hun zhun chun shun run zun cun sun',
    'wang duang guang kuang huang zhuang chuang shuang',
    'yù nü lü ju qu xu',
    'yù nü lü nü ju nü qu nü xu nü',
    'yue nüe lüe jue que xue',
    'yuan lüan juan quan xuan',
    'yùn lün jun qun xun',
  ];

  combinations.forEach((c) => {
    const unspaced = c.replace(/\s+/, '');
    it(`should split ${unspaced}`, () => {
      const expectedVal = c.split(/\s+/);
      assert.deepEqual(pinyinSeparate(unspaced), expectedVal);
    });
  });
});
