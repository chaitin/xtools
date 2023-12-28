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
    label: 'JSON JavaScript 互转',
    tags: [Tags.ENCODE, Tags.JSON],
    path: '/json2js',
    key: [],
    subTitle:
      'JSON JS 互转小工具，支持 JSON => JavaScript，JavaScript => JSON。',
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
    label: '中英文加空格',
    tags: [Tags.TEXT],
    path: '/cn_space_en',
    key: [],
    subTitle: '中英文之间加空格小工具。',
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
    label: 'MD5 在线碰撞',
    tags: [Tags.ENCRYPT, Tags.SECURITY],
    path: '/md5fastcollision',
    key: [],
    subTitle:
      '在线碰撞 MD5，生成 MD5 哈希相同的不同原始文本，基于 md5 fastcall 实现',
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
    label: 'DES 加解密',
    tags: [Tags.ENCRYPT],
    path: '/des',
    key: [],
    subTitle: '在线 DES 算法加解密工具。',
  },
  {
    label: '3DES 加解密',
    tags: [Tags.ENCRYPT],
    path: '/3des',
    key: [],
    subTitle: '在线 三重DES 算法加解密工具。',
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
    label: 'JSON 转 Go',
    tags: [Tags.JSON],
    path: '/json2go',
    key: [],
    subTitle: 'JSON 转 Go 结构体。',
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
    subTitle:
      '无论你是开发者、设计师还是普通用户，当你需要在不同的颜色表示格式之间进行转换时，这个小工具将会非常有用。',
  },
  {
    label: 'git 指令速查',
    tags: [Tags.DEV, Tags.OTHER],
    path: '/git',
    key: [],
    subTitle: 'git 指令速查小工具。',
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
  {
    label: 'XSS 向量生成器',
    tags: [Tags.SECURITY],
    path: '/xssvector',
    key: ['xss payload', 'XSS', 'XSS 攻击', 'XSS 代码'],
    subTitle: '自动生成 XSS Payload',
  },
  {
    label: 'Leet 转换器',
    tags: [Tags.OTHER, Tags.TEXT],
    path: '/leet_convert',
    key: [],
    subTitle: '输入普通文本，转换为 Leet 文本',
  },
  {
    label: '手绘白板',
    tags: [Tags.OTHER, Tags.OFFICIAL],
    path: '/excalidraw',
    key: [],
    subTitle:
      '技术文章配图神器，基于 Excalidraw 实现，可以方便的绘制流程图、统计图、原型图等',
  },
  {
    label: '图片压缩',
    tags: [Tags.IMAGE],
    path: '/img_sharp',
    key: ['图片压缩'],
    subTitle: '免费在线的图片压缩小工具',
  },
  {
    label: 'htpasswd',
    tags: [Tags.ENCODE],
    path: '/htpasswd',
    key: ['密码加密'],
    subTitle: '在线 htpasswd 生成工具',
  },
];
