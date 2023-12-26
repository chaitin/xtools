import { Tags } from './tags';

export type Tool = {
  label: string;
  tags: Tags[];
  path: string;
  subTitle: string;
  key: string[];
};

export const allTools: Tool[] = [
  {
    label: 'URL 编解码',
    tags: [Tags.ENCODE],
    path: '/urlencoder',
    key: [],
    subTitle: 'URL 编码解码小工具。',
  },
  {
    label: 'Base64 编解码',
    tags: [Tags.ENCODE, Tags.HOT],
    path: '/base64',
    key: [],
    subTitle: 'Base64 编码解码小工具。',
  },
  {
    label: '图片转 Base64',
    tags: [Tags.ENCODE, Tags.IMAGE],
    path: '/img2base64',
    key: [],
    subTitle:
      '图片的 BASE64 编码就是将图片数据编码成字符串，使用该字符串代替图片地址，从而不需要使用图片的 URL 地址。',
  },
  {
    label: '进制转换',
    tags: [Tags.OTHER],
    path: '/radix_convert',
    key: [],
    subTitle:
      '进制转换小工具，支持二进制、八进制、十进制、十六进制等之间的互相转换。',
  },
  {
    label: '字数统计',
    tags: [Tags.TEXT],
    path: '/word_count',
    key: [],
    subTitle: '字数统计小工具，支持中文、英文、数字、标点符号等的统计。',
  },
  {
    label: '大小写转换',
    tags: [Tags.TEXT],
    path: '/case_convert',
    key: [],
    subTitle: '大小写转换小工具，支持大写、小写、首字母大写、大小写互转等。',
  },
  {
    label: 'Unix 时间戳转换',
    tags: [Tags.DEV, Tags.HOT],
    path: '/unix',
    key: [],
    subTitle:
      'Unix 时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不考虑闰秒。',
  },
  {
    label: 'ASCII 码表',
    tags: [Tags.DEV],
    path: '/ascii',
    key: [],
    subTitle: 'ASCII 码查询表。',
  },
  {
    label: '密码哈希',
    tags: [Tags.ENCRYPT],
    path: '/hash',
    key: [],
    subTitle: '在线 MD5，SHA256 哈希算法计算小工具。',
  },
  {
    label: 'AES 加解密',
    tags: [Tags.ENCRYPT],
    path: '/aes',
    key: [],
    subTitle: '在线 AES 算法加解密工具。',
  },
  {
    label: 'JSON 转 CSV',
    tags: [Tags.JSON],
    path: '/jsontocsv',
    key: [],
    subTitle: 'JSON 转 CSV 和 EXCEL 小工具。',
  },
  {
    label: 'JSON 格式化',
    tags: [Tags.JSON],
    path: '/jsonfmt',
    subTitle: 'JSON 格式化小工具。',
    key: [],
  },
  {
    label: '随机数/密码生成',
    tags: [Tags.OTHER, Tags.HOT],
    path: '/random',
    key: [],
    subTitle: '该功能由浏览器在本地完成，您的任何输入都不会提交到服务端。',
  },
  {
    label: '颜色格式转换',
    tags: [Tags.OTHER],
    path: '/color_convert',
    key: [],
    subTitle: '无论你是开发者、设计师还是普通用户，当你需要在不同的颜色表示格式之间进行转换时，这个小工具将会非常有用。',
  },
  {
    label: '图片去色',
    tags: [Tags.IMAGE],
    path: '/uncolor',
    key: [],
    subTitle: '将彩色图片转换为黑白图片',
  },
  {
    label: 'Hex 编解码',
    tags: [Tags.ENCODE],
    path: '/hex',
    key: ['hex编码'],
    subTitle: '字符串和 HEX 编码互相转换工具',
  },
  {
    label: 'HTML 实体编解码',
    tags: [Tags.ENCODE],
    path: '/htmlentity',
    key: ['HTML 实体编码', 'HTML Entity 编码'],
    subTitle: 'HTML Entity 实体编解码工具',
  },
  {
    label: 'Hex 编辑器',
    tags: [Tags.DEV, Tags.BINARY],
    path: '/hexeditor',
    key: ['16进制查看', '16进制编辑', 'hex 编辑', 'hex 查看'],
    subTitle: 'Hex 16 进制在线查看, 在线编辑工具',
  },
  {
    label: '文件格式识别',
    tags: [Tags.OTHER, Tags.BINARY],
    path: '/file',
    key: ['未知文件格式识别', '文件头识别'],
    subTitle: '根据文件头识别文件格式的小工具',
  },
];
