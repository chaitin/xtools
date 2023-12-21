import OtherIcon from '@mui/icons-material/AutoAwesome';
import CodeIcon from '@mui/icons-material/Code';
import DataArrayIcon from '@mui/icons-material/DataArray';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import LockIcon from '@mui/icons-material/Lock';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

export enum Tags {
  CODE = 'code',
  TEXT = 'text',
  DEV = 'dev',
  PASSWORD = 'password',
  JSON = 'json',
  OTHER = 'other',
}

export const AllTags = [
  { name: Tags.CODE, icon: CodeIcon, label: '编码转码' },
  { name: Tags.DEV, icon: DeveloperModeIcon, label: '开发' },
  { name: Tags.TEXT, icon: TextSnippetIcon, label: '文字处理' },
  { name: Tags.PASSWORD, icon: LockIcon, label: '密码学' },
  { name: Tags.JSON, icon: DataArrayIcon, label: 'JSON' },
  { name: Tags.OTHER, icon: OtherIcon, label: '杂项' },
];

export type Tool = {
  label: string;
  tags: Tags[];
  path: string;
  subTitle: string;
};

export const routesMenu: Tool[] = [
  {
    label: 'URL 编解码',
    tags: [Tags.CODE],
    path: '/urlencoder',
    subTitle: 'URL 编码解码小工具。',
  },
  {
    label: 'Base64 编解码',
    tags: [Tags.CODE],
    path: '/base64',
    subTitle: 'Base64 编码解码小工具。',
  },
  {
    label: '图片转 Base64',
    tags: [Tags.CODE],
    path: '/img2base64',
    subTitle:
      '图片的 BASE64 编码就是将图片数据编码成字符串，使用该字符串代替图片地址，从而不需要使用图片的 URL 地址。',
  },
  {
    label: '进制转换',
    tags: [Tags.CODE],
    path: '/radix_convert',
    subTitle:
      '进制转换小工具，支持二进制、八进制、十进制、十六进制等之间的互相转换。',
  },
  {
    label: '字数统计',
    tags: [Tags.TEXT],
    path: '/word_count',
    subTitle: '字数统计小工具，支持中文、英文、数字、标点符号等的统计。',
  },
  {
    label: '大小写转换',
    tags: [Tags.TEXT],
    path: '/case_convert',
    subTitle: '大小写转换小工具，支持大写、小写、首字母大写、大小写互转等。',
  },
  {
    label: 'Unix 时间戳转换',
    tags: [Tags.DEV],
    path: '/unix',
    subTitle:
      'Unix 时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不考虑闰秒。',
  },
  {
    label: 'ASCII 码表',
    tags: [Tags.DEV],
    path: '/ascii',
    subTitle: 'ASCII 码查询表。',
  },
  {
    label: '密码哈希',
    tags: [Tags.PASSWORD],
    path: '/hash',
    subTitle: '在线 MD5，SHA256 哈希算法计算小工具。',
  },
  {
    label: 'AES 加解密',
    tags: [Tags.PASSWORD],
    path: '/aes',
    subTitle: '在线 AES 算法加解密工具。',
  },
  {
    label: 'JSON 转 CSV',
    tags: [Tags.JSON],
    path: '/jsontocsv',
    subTitle: 'JSON 转 CSV 和 EXCEL 小工具。',
  },

  {
    label: '随机数/密码生成',
    tags: [Tags.OTHER],
    path: '/random',
    subTitle: '该功能由浏览器在本地完成，您的任何输入都不会提交到服务端。',
  },
  {
    label: '图片去色',
    tags: [Tags.OTHER],
    path: '/uncolor',
    subTitle: '将彩色图片转换为黑白图片',
  },
];
