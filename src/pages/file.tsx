import MainContent from '@/components/MainContent';
import { Box, Button, Grid, Stack } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import wasm from '@/asset/wasm/file.js';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadImg = styled('img')({
  maxHeight: '100%',
  maxWidth: '100%',
});

const OutImg = styled('img')({
  Width: '100%',
  border: 'black solid 1px',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  margin: '20px',
  padding: '20px',
  borderRadius: '3px',
});

const MySpan = styled('span')({});

const wasmImports = {
  emscripten_memcpy_js() {},
  abort() {},
  fd_close() {},
  __syscall_fstat64() {},
  __syscall_stat64() {},
  __syscall_newfstatat() {},
  environ_sizes_get() {},
  environ_get() {},
  fd_read() {},
  fd_write() {},
  _tzset_js() {},
  emscripten_resize_heap() {},
  fd_seek() {},
  _mktime_js() {},
  _localtime_js() {},
};

const ImgBase64: React.FC = () => {
  useEffect(() => {
    console.log(wasm);
  }, []);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(-1);
  const [result, setResult] = useState<string>('未加载文件');
  const [data, setData] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const buffer = new Uint8Array(data);

  const matchContent = (arr: ArrayBuffer) => {
    const len = Math.min(arr.byteLength, 10 * 1024);
    return wasm.ccall(
      'detect',
      'string',
      ['array', 'number'],
      [new Uint8Array(arr, 0, len), len]
    );
  };

  const matchExtName = (x: string) => {
    return {
      '7Z': '压缩文件',
      AAC: 'Windows 音频文件',
      ADT: 'Windows 音频文件',
      ADTS: 'Windows 音频文件',
      ACCDB: 'Microsoft Access 数据库文件',
      ACCDE: 'Microsoft Access 仅执行文件',
      ACCDR: 'Microsoft Access 运行时数据库',
      ACCDT: 'Microsoft Access 数据库模板',
      AIF: '音频交换文件格式文件',
      AIFC: '音频交换文件格式文件',
      AIFF: '音频交换文件格式文件',
      ASPX: 'ASP.NET Active Server 页面',
      AVI: '音频视频交错电影或声音文件',
      BAT: '电脑批处理文件',
      BIN: '二进制压缩文件',
      BMP: '位图文件',
      CAB: 'Windows Cabinet 文件',
      CDA: 'CD 音频曲目',
      CSV: '逗号分隔值文件',
      DIF: '电子表格数据交换格式文件',
      DLL: '动态链接库文件',
      DOC: 'Word 2007 之前的 Microsoft Word 文档',
      DOCM: '启用宏的 Microsoft Word 文档',
      DOCX: 'Microsoft Word 文档',
      DOT: 'Word 2007 之前的 Microsoft Word 模板',
      DOTX: 'Microsoft Word 模板',
      EML: 'Outlook Express、Windows Live Mail 和其他程序创建的电子邮件文件',
      EPS: '封装的 PostScript 文件',
      EXE: '可执行程序文件',
      FLV: '与 Flash 兼容的视频文件',
      GIF: '图形交换格式文件',
      GZ: 'gzip 压缩文件',
      HTM: '超文本标记语言页面',
      HTML: '超文本标记语言页面',
      INI: 'Windows 初始化配置文件',
      ISO: 'ISO-9660 光盘映像',
      JAR: 'Java 体系结构文件',
      JPG: '联合图像专家组照片文件',
      JPEG: '联合图像专家组照片文件',
      M4A: 'MPEG-4 音频文件',
      MDB: 'Access 2007 之前的 Microsoft Access 数据库',
      MID: '乐器数字接口文件',
      MIDI: '乐器数字接口文件',
      MOV: 'Apple QuickTime 电影文件',
      MP3: 'MPEG Layer-3 音频文件',
      MP4: 'MPEG 4 视频',
      MPEG: '移动图片专家组电影文件',
      MPG: 'MPEG 1 系统流',
      MSI: 'Microsoft 安装程序文件',
      MUI: '多语言用户界面文件',
      PDF: '可移植文档格式文件',
      PNG: '可移植网络图形文件',
      POT: 'PowerPoint 2007 之前的 Microsoft PowerPoint 模板',
      POTM: '启用宏的 Microsoft PowerPoint 模板',
      POTX: 'Microsoft PowerPoint 模板',
      PPAM: 'Microsoft PowerPoint 加载项',
      PPS: 'PowerPoint 2007 之前的 Microsoft PowerPoint 幻灯片放映',
      PPSM: '启用宏的 Microsoft PowerPoint 幻灯片放映',
      PPSX: 'Microsoft PowerPoint 幻灯片放映',
      PPT: 'PowerPoint 2007 之前的 Microsoft PowerPoint 格式',
      PPTM: '启用宏的 Microsoft PowerPoint 演示文稿',
      PPTX: 'Microsoft PowerPoint 演示文稿',
      PSD: 'Adobe Photoshop 文件',
      PST: 'Outlook 数据存储',
      PUB: 'Microsoft Publisher 文件',
      RAR: 'Roshal Archive 压缩文件',
      RTF: '富文本格式文件',
      SLDM: '启用宏的 Microsoft PowerPoint 幻灯片',
      SLDX: 'Microsoft PowerPoint 幻灯片',
      SWF: 'Shockwave Flash 文件',
      SYS: 'Microsoft DOS 和 Windows 系统设置和变量文件',
      TAR: 'Linux tar 打包文件',
      TGZ: 'Linux tar/gzip 打包压缩文件',
      TIF: '标记图像格式文件',
      TIFF: '标记图像格式文件',
      TMP: '临时数据文件',
      TXT: '无格式文本文件',
      VOB: '对象视频文件',
      VSD: 'Visio 2013 之前的 Microsoft Visio 绘图',
      VSDM: '启用宏的 Microsoft Visio 绘图',
      VSDX: 'Microsoft Visio 绘图文件',
      VSS: 'Visio 2013 之前的 Microsoft Visio 模具',
      VSSM: '启用宏的 Microsoft Visio 模具',
      VST: 'Visio 2013 之前的 Microsoft Visio 模板',
      VSTM: '启用宏的 Microsoft Visio 模板',
      VSTX: 'Microsoft Visio 模板',
      WAV: 'Wave 音频文件',
      WBK: 'Microsoft Word 备份文档',
      WKS: 'Microsoft Works 文件',
      WMA: 'Windows Media 音频文件',
      WMD: 'Windows Media 下载文件',
      WMV: 'Windows Media 视频文件',
      WMZ: 'Windows Media 皮肤文件',
      WMS: 'Windows Media 皮肤文件',
      WPD: 'WordPerfect 文档',
      WP5: 'WordPerfect 文档',
      XLA: 'Microsoft Excel 加载项或宏文件',
      XLAM: 'Excel 2007 之后的 Microsoft Excel 加载项',
      XLL: 'Microsoft Excel 基于 DLL 的加载项',
      XLM: 'Excel 2007 之前的 Microsoft Excel 宏',
      XLS: 'Excel 2007 之前的 Microsoft Excel 工作簿',
      XLSM: 'Excel 2007 之后启用宏的 Microsoft Excel 工作簿',
      XLSX: 'Excel 2007 之后的 Microsoft Excel 工作簿',
      XLT: 'Excel 2007 之前的 Microsoft Excel 模板',
      XLTM: 'Excel 2007 之后启用宏的 Microsoft Excel 模板',
      XLTX: 'Excel 2007 之后的 Microsoft Excel 模板',
      XPS: '基于 XML 的文档',
      zip: '压缩文件',
      '3g2':
        'Multimedia container format defined by the 3GPP2 for 3G CDMA2000 multimedia services',
      '3gp':
        'Multimedia container format defined by the Third Generation Partnership Project (3GPP) for 3G UMTS multimedia services',
      '3mf': '3D Manufacturing Format',
      '7z': '7-Zip archive',
      Z: 'Unix Compressed File',
      aac: 'Advanced Audio Coding',
      ac3: 'ATSC A/52 Audio File',
      ace: 'ACE archive',
      ai: 'Adobe Illustrator Artwork',
      aif: 'Audio Interchange file',
      alias: 'macOS Alias file',
      amr: 'Adaptive Multi-Rate audio codec',
      ape: "Monkey's Audio",
      apng: 'Animated Portable Network Graphics',
      ar: 'Archive file',
      arj: 'Archive file',
      arrow: 'Columnar format for tables of data',
      arw: 'Sony Alpha Raw image file',
      asar: 'Archive format primarily used to enclose Electron applications',
      asf: 'Advanced Systems Format',
      avi: 'Audio Video Interleave file',
      avif: 'AV1 Image File Format',
      avro: 'Object container file developed by Apache Avro',
      blend: 'Blender project',
      bmp: 'Bitmap image file',
      bpg: 'Better Portable Graphics file',
      bz2: 'Archive file',
      cab: 'Cabinet file',
      cfb: 'Compound File Binary Format',
      chm: 'Microsoft Compiled HTML Help',
      class: 'Java class file',
      cpio: 'Cpio archive',
      cr2: 'Canon Raw image file (v2)',
      cr3: 'Canon Raw image file (v3)',
      crx: 'Google Chrome extension',
      cur: 'Icon file',
      dcm: 'DICOM Image File',
      deb: 'Debian package',
      dmg: 'Apple Disk Image',
      dng: 'Adobe Digital Negative image file',
      docx: 'Microsoft Word document',
      dsf: 'Sony DSD Stream File (DSF)',
      dwg: 'Autodesk CAD file',
      elf: 'Unix Executable and Linkable Format',
      eot: 'Embedded OpenType font',
      eps: 'Encapsulated PostScript',
      epub: 'E-book file',
      exe: 'Executable file',
      f4a: 'Audio-only ISO base media file format used by Adobe Flash Player',
      f4b: 'Audiobook and podcast ISO base media file format used by Adobe Flash Player',
      f4p: 'ISO base media file format protected by Adobe Access DRM used by Adobe Flash Player',
      f4v: 'ISO base media file format used by Adobe Flash Player',
      fbx: 'Filmbox is a proprietary file format used to provide interoperability between digital content creation apps.',
      flac: 'Free Lossless Audio Codec',
      flif: 'Free Lossless Image Format',
      flv: 'Flash video',
      gif: 'Graphics Interchange Format',
      glb: 'GL Transmission Format',
      gz: 'Archive file',
      heic: 'High Efficiency Image File Format',
      icc: 'ICC Profile',
      icns: 'Apple Icon image',
      ico: 'Windows icon file',
      ics: 'iCalendar',
      indd: 'Adobe InDesign document',
      it: 'Audio module format: Impulse Tracker',
      j2c: 'JPEG 2000',
      jls: 'Lossless/near-lossless compression standard for continuous-tone images',
      jp2: 'JPEG 2000',
      jpg: 'Joint Photographic Experts Group image',
      jpm: 'JPEG 2000',
      jpx: 'JPEG 2000',
      jxl: 'JPEG XL image format',
      jxr: 'Joint Photographic Experts Group extended range',
      ktx: 'OpenGL and OpenGL ES textures',
      lnk: 'Microsoft Windows file shortcut',
      lz: 'Archive file',
      lzh: 'LZH archive',
      m4a: 'Audio-only MPEG-4 files',
      m4b: 'Audiobook and podcast MPEG-4 files, which also contain metadata including chapter markers, images, and hyperlinks',
      m4p: 'MPEG-4 files with audio streams encrypted by FairPlay Digital Rights Management as were sold through the iTunes Store',
      m4v: 'Video container format developed by Apple, which is very similar to the MP4 format',
      macho: 'Mach-O binary format',
      mid: 'Musical Instrument Digital Interface file',
      mie: 'Dedicated meta information format which supports storage of binary as well as textual meta information',
      mj2: 'Motion JPEG 2000',
      mkv: 'Matroska video file',
      mobi: 'Mobipocket',
      mov: 'QuickTime video file',
      mp1: 'MPEG-1 Audio Layer I',
      mp2: 'MPEG-1 Audio Layer II',
      mp3: 'Audio file',
      mp4: 'MPEG-4 Part 14 video file',
      mpc: 'Musepack (SV7 & SV8)',
      mpg: 'MPEG-1 file',
      mts: 'MPEG-2 Transport Stream, both raw and Blu-ray Disc Audio-Video (BDAV) versions',
      mxf: 'Material Exchange Format',
      nef: 'Nikon Electronic Format image file',
      nes: 'Nintendo NES ROM',
      odp: 'OpenDocument for presentations',
      ods: 'OpenDocument for spreadsheets',
      odt: 'OpenDocument for word processing',
      oga: 'Audio file',
      ogg: 'Audio file',
      ogm: 'Audio file',
      ogv: 'Audio file',
      ogx: 'Audio file',
      opus: 'Audio file',
      orf: 'Olympus Raw image file',
      otf: 'OpenType font',
      parquet: 'Apache Parquet',
      pcap: 'Libpcap File Format',
      pdf: 'Portable Document Format',
      pgp: 'Pretty Good Privacy',
      png: 'Portable Network Graphics',
      pptx: 'Microsoft Powerpoint document',
      ps: 'Postscript',
      psd: 'Adobe Photoshop document',
      pst: 'Personal Storage Table file',
      qcp: 'Tagged and chunked data',
      raf: 'Fujifilm RAW image file',
      rar: 'Archive file',
      rpm: 'Red Hat Package Manager file',
      rtf: 'Rich Text Format',
      rw2: 'Panasonic RAW image file',
      s3m: 'Audio module format: ScreamTracker 3',
      shp: 'Geospatial vector data format',
      skp: 'SketchUp',
      spx: 'Audio file',
      sqlite: 'SQLite file',
      stl: 'Standard Tesselated Geometry File Format (ASCII only)',
      swf: 'Adobe Flash Player file',
      tar: 'Tarball archive file',
      tif: 'Tagged Image file',
      ttf: 'TrueType font',
      vcf: 'vCard',
      voc: 'Creative Voice File',
      wasm: 'WebAssembly intermediate compiled format',
      wav: 'Waveform Audio file',
      webm: 'Web video file',
      webp: 'Web Picture format',
      woff: 'Web Open Font Format',
      woff2: 'Web Open Font Format',
      wv: 'WavPack',
      xcf: 'eXperimental Computing Facility',
      xlsx: 'Microsoft Excel document',
      xm: 'Audio module format: FastTracker 2',
      xml: 'eXtensible Markup Language',
      xpi: 'XPInstall file',
      xz: 'Compressed file',
      zst: 'Archive file',
    }[x];
  };

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target !== null) {
          setData(e.target.result as ArrayBuffer);
          setResult(matchContent(e.target.result as ArrayBuffer));
        }
      };
      setFileName(files[0].name);
      setFileSize(files[0].size);
      reader.readAsArrayBuffer(files[0]);
    },
    []
  );

  const Hex = styled('span')({
    fontFamily: 'Mono',
    fontSize: '14px',
    fontWeight: '600',
    color: 'rgba(0,0,0,0.9)',
    paddingLeft: '0px',
    paddingRight: '12px',
    cursor: 'text',
  });

  const Text = styled('span')({
    fontFamily: 'Mono',
    fontSize: '14px',
    color: 'rgba(0,0,0,0.7)',
    cursor: 'default',
    paddingLeft: '1px',
  });

  const toHex = (x: number) => {
    if (typeof x === 'undefined') {
      return '--';
    } else {
      return ('00' + x.toString(16)).slice(-2);
    }
  };

  const toText = (x: number) => {
    if (x >= 0x21 && x <= 0x7e) {
      return <Text>{String.fromCharCode(x)}</Text>;
    } else {
      return <Text>.</Text>;
    }
  };
  return (
    <MainContent>
      <Box sx={{ width: '100%' }}>
        <Button
          component='label'
          variant='outlined'
          sx={{ borderRadius: '3px', height: '40px', width: '100%' }}
        >
          {fileName ? '已加载文件 ' + fileName : '加载文件'}
          <VisuallyHiddenInput type='file' onChange={handleSelectFile} />
        </Button>
        {fileName ? (
          <Stack
            spacing={3}
            sx={{ borderRadius: '3px', marginTop: '30px', fontSize: '14px' }}
          >
            <Grid container>
              <Grid
                item
                xs={1}
                sx={{ color: 'rgba(0,0,0,0.5)', textAlign: 'right' }}
              >
                文件名
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid
                item
                xs={10}
                sx={{ color: 'rgb(0,0,0)', fontFamily: 'Mono' }}
              >
                {fileName}
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={1}
                sx={{ color: 'rgba(0,0,0,0.5)', textAlign: 'right' }}
              >
                扩展名
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid
                item
                xs={10}
                sx={{ color: 'rgb(0,0,0)', fontFamily: 'Mono' }}
              >
                {fileName.split('.').pop()?.toUpperCase()} -{' '}
                {matchExtName(fileName.split('.').pop()?.toUpperCase() || '')}
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={1}
                sx={{ color: 'rgba(0,0,0,0.5)', textAlign: 'right' }}
              >
                文件大小
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid
                item
                xs={10}
                sx={{ color: 'rgb(0,0,0)', fontFamily: 'Mono' }}
              >
                {fileSize.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
                Bytes
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={1}
                sx={{ color: 'rgba(0,0,0,0.5)', textAlign: 'right' }}
              >
                文件头
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Hex>{toHex(buffer[0])}</Hex>
                <Hex>{toHex(buffer[1])}</Hex>
                <Hex>{toHex(buffer[2])}</Hex>
                <Hex sx={{ marginRight: '10px' }}>{toHex(buffer[3])}</Hex>
                <Hex>{toHex(buffer[4])}</Hex>
                <Hex>{toHex(buffer[5])}</Hex>
                <Hex>{toHex(buffer[6])}</Hex>
                <Hex sx={{ marginRight: '10px' }}>{toHex(buffer[7])}</Hex>
                <Hex>{toHex(buffer[8])}</Hex>
                <Hex>{toHex(buffer[9])}</Hex>
                <Hex>{toHex(buffer[10])}</Hex>
                <Hex sx={{ marginRight: '10px' }}>{toHex(buffer[11])}</Hex>
                <Hex>{toHex(buffer[12])}</Hex>
                <Hex>{toHex(buffer[13])}</Hex>
                <Hex>{toHex(buffer[14])}</Hex>
                <Hex sx={{ marginRight: '30px' }}>{toHex(buffer[15])}</Hex>
                <Text>{toText(buffer[0])}</Text>
                <Text>{toText(buffer[1])}</Text>
                <Text>{toText(buffer[2])}</Text>
                <Text>{toText(buffer[3])}</Text>
                <Text>{toText(buffer[4])}</Text>
                <Text>{toText(buffer[5])}</Text>
                <Text>{toText(buffer[6])}</Text>
                <Text>{toText(buffer[7])}</Text>
                <Text>{toText(buffer[8])}</Text>
                <Text>{toText(buffer[9])}</Text>
                <Text>{toText(buffer[10])}</Text>
                <Text>{toText(buffer[11])}</Text>
                <Text>{toText(buffer[12])}</Text>
                <Text>{toText(buffer[13])}</Text>
                <Text>{toText(buffer[14])}</Text>
                <Text>{toText(buffer[15])}</Text>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                xs={1}
                sx={{ color: 'rgba(0,0,0,0.5)', textAlign: 'right' }}
              >
                内容格式
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid
                item
                xs={10}
                sx={{ color: 'rgb(0,0,0)', fontFamily: 'Mono' }}
              >
                {result}
              </Grid>
            </Grid>
          </Stack>
        ) : (
          <></>
        )}
      </Box>
    </MainContent>
  );
};

export default ImgBase64;
