import MainContent from '@/components/MainContent';
import alert from '@/components/Alert';
import { Box, Button, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { parseStringPromise, Builder } from 'xml2js';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-xml';

/**
 * A => json
 * B => xml
 *
 * 适用于两种语言的互转模版
 * 1. 更改 import ace-builds/src-noconflict/mode-*
 * 2. 更改所有 enum 枚举值
 * 3. 在 a2b() 函数和 b2a() 函数中添加转换逻辑 return 转换结果
 * */

// 转换顺序
enum ConvertType {
  A2B = 1,
  B2A = 2,
}
// 导出文件 MIME 类型；未知设为空
enum ConvertFileType {
  A2B = 'application/json',
  B2A = 'application/xml',
}
// 导出文件名；未知 MIME 类型补充后缀
enum ExportType {
  A2B = 'jsontoxml',
  B2A = 'xmltojson',
}
// 按钮文字
enum ButtonText {
  A2B = 'JSON',
  B2A = 'XML',
}
// 导入限制类型
enum InputAccept {
  A2B = '.json',
  B2A = '.xml',
}
// ace 编辑器 mode 类型
enum AceMode {
  A2B = 'json',
  B2A = 'xml',
}

const _C = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [convert, setConvert] = useState(ConvertType.A2B);
  const [error, setError] = useState('');

  // 处理 a2b
  const a2b = async (v: string) => {
    try {
      const builder = new Builder();
      const xml = builder.buildObject(JSON.parse(v));
      setB(xml);
    } catch (e) {
      setError(String(e));
    }
  };

  // 处理 b2a
  const b2a = async (v: string) => {
    try {
      const json = await parseStringPromise(v, { explicitArray: false });
      setA(JSON.stringify(json, null, 2));
    } catch (e) {
      setError(String(e) || '未知错误');
    }
  };

  const saveStringToFile = () => {
    const blob =
      convert === ConvertType.A2B
        ? new Blob([b], { type: ConvertFileType.B2A })
        : new Blob([a], { type: ConvertFileType.A2B });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download =
      convert === ConvertType.A2B ? ExportType.A2B : ExportType.B2A;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const handleClick = useCallback(() => {
    alert.success('复制成功');
  }, []);

  const handleButtonClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      console.log(
        '🐵 ~ file: json2xml.tsx:112 ~ handleFileChange ~ file:',
        file
      );
      if (
        file.type ===
        (convert === ConvertType.A2B
          ? ConvertFileType.A2B
          : ConvertFileType.B2A)
      ) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const content = e.target.result;
          if (convert === ConvertType.A2B) {
            setA(content);
          } else setB(content);
          setError('');
        };

        reader.readAsText(file);
      } else {
        setA('');
        setError('Invalid file type.');
      }
    }
  };

  useEffect(() => {
    if (a.trim() === '') {
      setB('');
      setError('');
      return;
    }
    if (convert === ConvertType.A2B) {
      try {
        a2b(a);
        setError('');
      } catch (e) {
        setError(String(e));
      }
    }
  }, [a, convert]);

  useEffect(() => {
    if (!b) {
      setA('');
      setError('');
      return;
    }
    if (convert === ConvertType.B2A) {
      // 判断是否是数组或对象
      try {
        b2a(b);
        setError('');
      } catch (e) {
        setError(String(e));
      }
    } else {
      setError('');
    }
  }, [b, convert]);

  return (
    <MainContent>
      <Box
        sx={{
          '#ace-editor *': {
            fontFamily: 'Mono',
          },
        }}
      >
        <Stack
          sx={{ mb: 2 }}
          justifyContent={'center'}
          direction={'row'}
          spacing={2}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{ width: '100%' }}
          >
            <Button size='small' variant='outlined' onClick={handleButtonClick}>
              上传{' '}
              {convert === ConvertType.B2A ? ButtonText.B2A : ButtonText.A2B}
            </Button>
            <Box>
              {convert === ConvertType.B2A ? ButtonText.B2A : ButtonText.A2B}
            </Box>
          </Stack>
          <Box
            sx={{
              width: '24px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              mx: 3,
              flexShrink: 0,
              color: '#999',
            }}
            onClick={() =>
              setConvert(
                convert === ConvertType.B2A ? ConvertType.A2B : ConvertType.B2A
              )
            }
          >
            <SwapHorizontalCircleIcon />
          </Box>
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            sx={{ width: '100%' }}
          >
            <Box>
              {convert === ConvertType.B2A ? ButtonText.A2B : ButtonText.B2A}
            </Box>
            <Stack direction={'row'} alignItems={'center'}>
              <CopyToClipboard
                text={convert === ConvertType.B2A ? a : b}
                onCopy={handleClick}
              >
                <Button size='small'>复制</Button>
              </CopyToClipboard>
              <Button
                size='small'
                variant='contained'
                disabled={!!error}
                onClick={saveStringToFile}
              >
                导出{' '}
                {convert === ConvertType.B2A ? ButtonText.A2B : ButtonText.B2A}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={3}>
          <AceEditor
            name='a'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 310px)',
            }}
            value={convert === ConvertType.B2A ? b : a}
            mode={convert === ConvertType.B2A ? AceMode.B2A : AceMode.A2B}
            theme='monokai'
            onChange={convert === ConvertType.B2A ? setB : setA}
            editorProps={{ $blockScrolling: true }}
          />
          <AceEditor
            name='b'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 310px)',
            }}
            value={error || (convert === ConvertType.B2A ? a : b)}
            mode={convert === ConvertType.B2A ? AceMode.A2B : AceMode.B2A}
            theme='monokai'
            readOnly
            editorProps={{ $blockScrolling: true }}
          />
        </Stack>
        <Box
          component={'input'}
          id='fileInput'
          type='file'
          accept={
            convert === ConvertType.B2A ? InputAccept.B2A : InputAccept.A2B
          }
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>
    </MainContent>
  );
};

export default _C;
