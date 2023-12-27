import MainContent from '@/components/MainContent';
import alert from '@/components/Alert';
import { Box, Button, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

enum ConvertType {
  JSON2JS = 1,
  JS2JSON = 2,
}

const _C = () => {
  const [json, setJson] = useState('');
  const [js, setJs] = useState<any>();
  const [convert, setConvert] = useState(ConvertType.JSON2JS);
  const [error, setError] = useState('');

  const saveStringToFile = () => {
    const blob =
      convert === ConvertType.JSON2JS
        ? new Blob([js], { type: 'text/javascript;charset=utf-8;' })
        : new Blob([json], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = convert === ConvertType.JSON2JS ? 'jsontojs' : 'jstojson';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const handleClick = useCallback(() => {
    alert.success('复制成功');
  }, []);

  const handleButtonClick = () => {
    // 触发隐藏的input元素
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      if (
        file.type ===
        `${
          convert === ConvertType.JSON2JS
            ? 'application/json'
            : 'text/javascript'
        }`
      ) {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const content = e.target.result;
          if (convert === ConvertType.JSON2JS) {
            setJson(content);
          } else setJs(content);
          setError('');
        };

        reader.readAsText(file);
      } else {
        setJson('');
        setError('Invalid file type.');
      }
    }
  };

  useEffect(() => {
    if (json.trim() === '') {
      setJs('');
      setError('');
      return;
    }
    if (convert === ConvertType.JSON2JS) {
      try {
        setJs(JSON.stringify(JSON.parse(json), null, 2));
        setError('');
      } catch (e) {
        setError(String(e));
      }
    }
  }, [json, convert]);

  useEffect(() => {
    if (!js) {
      setJson('');
      setError('');
      return;
    }
    if (convert === ConvertType.JS2JSON) {
      // 判断是否是数组或对象
      if (js.startsWith('[') || js.startsWith('{')) {
        try {
          const jsData = new Function(`return ${js}`)();
          // const jsData = eval(`(${js})`)
          setJson(JSON.stringify(jsData, null, 2));
          setError('');
        } catch (e) {
          setError(String(e));
        }
      } else {
        setError('');
      }
    }
  }, [js, convert]);

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
              上传 {convert === ConvertType.JS2JSON ? 'JavaScript' : 'JSON'}
            </Button>
            <Box>{convert === ConvertType.JS2JSON ? 'JavaScript' : 'JSON'}</Box>
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
                convert === ConvertType.JS2JSON
                  ? ConvertType.JSON2JS
                  : ConvertType.JS2JSON
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
            <Box>{convert === ConvertType.JS2JSON ? 'JSON' : 'JavaScript'}</Box>
            <Stack direction={'row'} alignItems={'center'}>
              <CopyToClipboard
                text={convert === ConvertType.JS2JSON ? json : js}
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
                导出 {convert === ConvertType.JS2JSON ? 'JSON' : 'JavaScript'}
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={3}>
          <AceEditor
            name='ace-editor'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 310px)',
            }}
            value={convert === ConvertType.JS2JSON ? js : json}
            mode={convert === ConvertType.JS2JSON ? 'javascript' : 'json'}
            theme='monokai'
            onChange={convert === ConvertType.JS2JSON ? setJs : setJson}
            editorProps={{ $blockScrolling: true }}
          />
          <AceEditor
            name='ace-editor'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 310px)',
            }}
            value={error || (convert === ConvertType.JS2JSON ? json : js)}
            mode={convert === ConvertType.JS2JSON ? 'json' : 'javascript'}
            theme='monokai'
            readOnly
            editorProps={{ $blockScrolling: true }}
          />
        </Stack>
        <Box
          component={'input'}
          id='fileInput'
          type='file'
          accept={convert === ConvertType.JS2JSON ? '.js' : '.json'}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>
    </MainContent>
  );
};

export default _C;
