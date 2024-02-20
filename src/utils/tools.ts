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
    label: '图片添加水印',
    tags: [Tags.IMAGE],
    path: '/watermark',
    key: [],
    subTitle: '给图片添加水印',
  },
  {
    label: '图片添加圆角',
    tags: [Tags.IMAGE],
    path: '/img_radius',
    key: [],
    subTitle: '给图片添加圆角',
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
    label: '下划线驼峰互转',
    tags: [Tags.TEXT],
    path: '/camelcase',
    key: [],
    subTitle: '下划线驼峰互转小工具。',
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
    tags: [Tags.DEV],
    path: '/unix',
    key: [],
    subTitle:
      'Unix 时间戳是从1970年1月1日（UTC/GMT的午夜）开始所经过的秒数，不考虑闰秒。',
  },
  {
    label: 'ASCII 码表',
    tags: [Tags.DEV, Tags.HOT],
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
    label: 'ZIP 密码在线破解',
    tags: [Tags.ENCRYPT, Tags.SECURITY, Tags.HOT],
    path: '/zipcrack',
    key: [],
    subTitle: '在线破解 ZIP 压缩包的文件密码',
  },
  {
    label: '密码哈希',
    tags: [Tags.ENCRYPT, Tags.HOT],
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
    label: 'RSA 加解密',
    tags: [Tags.ENCRYPT],
    path: '/rsa',
    key: [],
    subTitle: '在线 RSA 算法加解密工具。',
  },
  {
    label: '摩斯电码 加解密',
    tags: [Tags.ENCRYPT],
    path: '/morse',
    key: [],
    subTitle: '在线 摩斯电码 加解密工具。',
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
    tags: [Tags.JSON, Tags.FORMAT],
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
    label: 'JSON 转 yaml',
    tags: [Tags.JSON],
    path: '/json2yaml',
    key: [],
    subTitle: 'JSON 转 yaml 小工具。',
  },
  {
    label: '随机数/密码生成',
    tags: [Tags.OTHER, Tags.HOT],
    path: '/random',
    key: [],
    subTitle: '该功能由浏览器在本地完成，您的任何输入都不会提交到服务端。',
  },
  {
    label: '随机 IP 生成器',
    tags: [Tags.OTHER],
    path: '/random_ip',
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
    label: 'SQL 格式化',
    tags: [Tags.DEV],
    path: '/sqlfmt',
    key: [],
    subTitle: 'SQL 格式化小工具。',
  },
  {
    label: 'SQLite 在线浏览',
    tags: [Tags.DEV],
    path: '/sqlite',
    key: [],
    subTitle:
      '在线管理 SQLite 数据库, 在线浏览 SQLite 数据, 自定义 SQLite 查询语句',
  },
  {
    label: '图片去色',
    tags: [Tags.IMAGE],
    path: '/uncolor',
    key: [],
    subTitle: '将彩色图片转换为黑白图片',
  },
  {
    label: '图片像素化',
    tags: [Tags.IMAGE],
    path: '/pixel_img',
    key: [],
    subTitle: '图片像素化工具',
  },
  {
    label: '图片格式转换',
    tags: [Tags.IMAGE],
    path: '/img_conversion',
    key: [],
    subTitle: '支持 png, jpg, jpeg, webp, bmp, gif, ico 格式',
  },
  {
    label: 'Hex 编解码',
    tags: [Tags.ENCODE],
    path: '/hex',
    key: ['hex编码'],
    subTitle: '字符串和 HEX 编码互相转换工具',
  },
  {
    label: 'CIDR 计算',
    tags: [Tags.OTHER],
    path: '/cidr',
    key: ['cidr 计算'],
    subTitle: '计算 CIDR 工具',
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
    label: 'Pyc 转 Py',
    tags: [Tags.BINARY],
    path: '/pyc2py',
    key: ['pyc 转 py', 'pyc 反编译'],
    subTitle: 'pyc 反编译工具',
  },
  {
    label: 'Pyc 转 Asm',
    tags: [Tags.BINARY],
    path: '/pyc2asm',
    key: ['pyc 转 asm', 'pyc 反汇编'],
    subTitle: 'pyc 反汇编工具',
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
    tags: [Tags.OTHER, Tags.OFFICIAL, Tags.HOT],
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
    label: '早中晚吃啥呢',
    tags: [Tags.OTHER],
    path: '/eatwhat',
    key: [],
    subTitle: '干饭人🍚必备小工具。',
  },
  {
    label: 'UUID 生成',
    tags: [Tags.DEV],
    path: '/uuid_gen',
    key: [],
    subTitle: 'UUID 生成小工具。',
  },
  {
    label: 'Htpasswd',
    tags: [Tags.ENCODE],
    path: '/htpasswd',
    key: ['密码加密'],
    subTitle: '在线 htpasswd 生成工具，多用于 Nginx Basic Auth',
  },
  {
    label: '随机 USER-AGENT',
    tags: [Tags.OTHER],
    path: '/random_ua',
    key: ['随机 UA'],
    subTitle: ' 随机 USER-AGENT 生成工具',
  },
  {
    label: '文本对比 diff',
    tags: [Tags.OTHER, Tags.TEXT],
    path: '/diff',
    key: ['在线文本对比Diff', '高亮显示'],
    subTitle: '在线文本对比Diff，支持多种对比模式，差异部分高亮显示',
  },
  {
    label: '在线 JSFuck 加密',
    tags: [Tags.ENCODE],
    path: '/jsfuck',
    key: ['在线 JSFuck 加密'],
    subTitle: 'JSFuck 加密',
  },
  {
    label: '颜色吸取器',
    tags: [Tags.OTHER],
    path: '/color_picker',
    key: [],
    subTitle: '在线颜色吸取器，可以快速生成十种常用颜色的代码',
  },
  {
    label: 'LESS CSS 互转',
    tags: [Tags.DEV],
    path: '/less2css',
    key: [],
    subTitle: '支持 less 转 css，css 转 less',
  },
  {
    label: 'markdown html 格式互转',
    tags: [Tags.DEV],
    path: '/md2html',
    key: [],
    subTitle: 'markdown html 格式互转',
  },
  {
    label: 'JSON XML 互转',
    tags: [Tags.JSON],
    path: '/json2xml',
    key: [],
    subTitle: 'JSON 转 XML，XML 转 JSON',
  },
  {
    label: '图片 OCR 识别',
    tags: [Tags.IMAGE],
    path: '/ocr',
    key: [],
    subTitle: '支持识别中文、英语、俄语、德语、法语、日语、韩语',
  },
  {
    label: '音频格式转换',
    tags: [Tags.MEDIA],
    path: '/audiofmt',
    key: [],
    subTitle: '音频格式转换小工具',
  },
  {
    label: '视频格式转换',
    tags: [Tags.MEDIA],
    path: '/videofmt',
    key: [],
    subTitle: '视频格式转换小工具',
  },
  {
    label: '视频提取音频',
    tags: [Tags.MEDIA],
    path: '/getvideoaudio',
    key: [],
    subTitle: '视频提取音频小工具',
  },
  {
    label: '视频帧截图',
    tags: [Tags.MEDIA],
    path: '/videoframe',
    key: [],
    subTitle: '视频帧截图小工具',
  },
  {
    label: '视频转 gif',
    tags: [Tags.MEDIA],
    path: '/video2gif',
    key: [],
    subTitle: '视频转 gif 小工具',
  },
  {
    label: 'HTML 格式化',
    tags: [Tags.FORMAT],
    path: '/htmlfmt',
    key: [],
    subTitle: 'HTML 格式化小工具',
  },
  {
    label: 'XML 格式化',
    tags: [Tags.FORMAT],
    path: '/xmlfmt',
    key: [],
    subTitle: 'XML 格式化小工具',
  },
  {
    label: 'CSS 格式化',
    tags: [Tags.FORMAT],
    path: '/cssfmt',
    key: [],
    subTitle: 'CSS 格式化小工具',
  },
  {
    label: 'YAML 格式化',
    tags: [Tags.FORMAT],
    path: '/yamlfmt',
    key: [],
    subTitle: 'YAML 格式化小工具',
  },
  {
    label: 'JavaScript 格式化',
    tags: [Tags.FORMAT],
    path: '/jsfmt',
    key: [],
    subTitle: 'JavaScript 格式化小工具',
  },
  {
    label: 'TypeScript 格式化',
    tags: [Tags.FORMAT],
    path: '/tsfmt',
    key: [],
    subTitle: 'TypeScript 格式化小工具',
  },
  {
    label: '二维码生成器',
    tags: [Tags.OTHER],
    path: '/generate_qrcode',
    key: [],
    subTitle: '二维码生成器小工具',
  },
  {
    label: '二维码解析器',
    tags: [Tags.OTHER],
    path: '/de_qrcode',
    key: [],
    subTitle: '二维码解析器小工具',
  },
  {
    label: '南丁格尔玫瑰图',
    tags: [Tags.OFFICIAL, Tags.OTHER],
    path: '/chart_nightingale',
    key: [],
    subTitle: '南丁格尔玫瑰图小工具',
  },
  {
    label: '雷达图',
    tags: [Tags.OFFICIAL, Tags.OTHER],
    path: '/chart_radar',
    key: [],
    subTitle: '雷达图小工具',
  },
  {
    label: '折线图',
    tags: [Tags.OFFICIAL, Tags.OTHER],
    path: '/chart_line',
    key: [],
    subTitle: '折线图小工具',
  },
  {
    label: '倒计时',
    tags: [Tags.OTHER],
    path: '/countdown',
    key: [],
    subTitle: '倒计时小工具',
  },
  {
    label: '文件树生成',
    tags: [Tags.DEV],
    path: '/dir_tree',
    key: [],
    subTitle: '生成文件夹目录树的小工具',
  },
  {
    label: 'CSS 压缩',
    tags: [Tags.DEV],
    path: '/css_minifier',
    key: [],
    subTitle: 'CSS 压缩小工具',
  },
  {
    label: '随机邮箱生成',
    tags: [Tags.OTHER],
    path: '/random_email',
    key: [],
    subTitle: '随机邮箱生成小工具',
  },
  {
    label: '人生格子',
    tags: [Tags.OTHER],
    path: '/lifecount',
    key: [],
    subTitle: '人生格子小工具',
  },
  {
    label: 'Figlet',
    tags: [Tags.TEXT],
    path: '/figlet',
    key: [],
    subTitle: '将字符转换为大型艺术字， 常用于浏览器控制台和终端',
  },
  {
    label: '在线添加行号',
    tags: [Tags.TEXT],
    path: '/line_number',
    key: [],
    subTitle: '在线批量有序添加行号',
  },
  {
    label: 'Docker run 命令转 Docker compose',
    tags: [Tags.DEV],
    path: '/docker_run_to_docker_compose',
    key: [],
    subTitle: 'docker run 命令转 docker compose',
  },
  {
    label: '多格切图',
    tags: [Tags.IMAGE],
    path: '/img_split',
    key: [],
    subTitle: '支持将任意图片进行九宫格切图或多格切图',
  },
  {
    label: '社会主义核心价值观加解密',
    tags: [Tags.ENCRYPT],
    path: '/cvencode',
    key: [],
    subTitle: '在线社会主义核心价值观加解密工具。',
  },
  {
    label: '乱序文字生成器',
    tags: [Tags.TEXT],
    path: '/shuffle_text_generator',
    key: [],
    subTitle: '乱序文字生成器可以打乱文字和段落顺序，保持数量和出现次数不变。',
  },
  {
    label: '凯撒密码在线加密解密',
    tags: [Tags.ENCRYPT],
    path: '/caesar',
    key: [],
    subTitle:
      '凯撒密码最早由古罗马军事统帅盖乌斯·尤利乌斯·凯撒在军队中用来传递加密信息，故称凯撒密码。此为一种位移加密手段，只对26个（大小写）字母进行位移加密，规则相当简单，容易被破解',
  },
  {
    label: '栅栏密码在线加密解密',
    tags: [Tags.ENCRYPT],
    path: '/rail_fence_cipher',
    key: [],
    subTitle:
      '所谓栅栏密码，就是把要加密的明文分成N个一组，然后把每组的第1个字连起来，形成一段无规律的话。 不过栅栏密码本身有一个潜规则，就是组成栅栏的字母一般不会太多。（一般不超过30个，也就是一、两句话）',
  },
  {
    label: 'Unicode 编码解码',
    tags: [Tags.ENCODE],
    path: '/unicode',
    key: [],
    subTitle:
      'Unicode，又译作万国码、统一字元码、统一字符编码，是信息技术领域的业界标准，其整理、编码了世界上大部分的文字系统，使得电脑能以通用划一的字符集来处理和显示文字，不但减轻在不同编码系统间切换和转换的困扰，更提供了一种跨平台的乱码问题解决方案。',
  },
];
