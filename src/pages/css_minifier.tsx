import MainContent from '@/components/MainContent';
import alert from '@/components/Alert';
import { Box, Button, Checkbox, Stack, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CleanCSS, { type Options } from 'clean-css';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/theme-monokai';

const _C = () => {
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [keepBreaks, setKeepBreaks] = useState(false);

  const handleCompress = async (inputCSS: string) => {
    try {
      const options: Options = {};
      if (keepBreaks) {
        options.format = 'keep-breaks';
      }
      const result = new CleanCSS(options).minify(inputCSS).styles;
      setResult(result || inputCSS.trim());
      setError('');
    } catch (e) {
      setError(String(e));
    }
  };

  const handleDownloadResult = () => {
    const blob = new Blob([result], { type: 'text/css' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'styles.min.css';

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
      if (file.type === 'text/css') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const content = e.target.result;
          setValue(content);
          setError('');
        };

        reader.readAsText(file);
      } else {
        setValue('');
        setError('Invalid file type.');
      }
      event.target.value = '';
    }
  };

  useEffect(() => {
    if (!value) {
      setValue('');
      setError('');
      setResult('');
      return;
    }
    handleCompress(value);
  }, [value, keepBreaks]);

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
          sx={{ mb: 1 }}
          justifyContent={'center'}
          direction={'row'}
          spacing={2}
        >
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{ width: '100%' }}
          >
            <Typography sx={{ fontSize: '14px' }}>CSS 内容</Typography>
            <Box>
              <Button size='small' onClick={() => setValue('')}>
                清空
              </Button>
              <Button
                size='small'
                variant='outlined'
                onClick={handleButtonClick}
                sx={{ borderRadius: '4px', ml: 1 }}
              >
                上传 CSS
              </Button>
            </Box>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            sx={{ width: '100%' }}
          >
            <Stack direction='row' alignItems='center'>
              <Typography sx={{ fontSize: '14px' }}>压缩结果</Typography>
              <Box ml={1}>
                <Checkbox
                  size='small'
                  checked={Boolean(keepBreaks)}
                  onChange={(event: any) => setKeepBreaks(event.target.checked)}
                />
                <Typography
                  component='span'
                  sx={{ fontSize: '14px', lineHeight: '38px' }}
                >
                  压缩保留换行
                </Typography>
              </Box>
            </Stack>
            <Box>
              <CopyToClipboard text={result} onCopy={handleClick}>
                <Button size='small' disabled={!result}>
                  复制
                </Button>
              </CopyToClipboard>
              <Button
                size='small'
                variant='contained'
                disabled={!!error || !result}
                onClick={handleDownloadResult}
                sx={{ borderRadius: '4px', ml: 1 }}
              >
                导出
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Stack direction={'row'} spacing={3}>
          <AceEditor
            name='a'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 265px)',
            }}
            value={value}
            mode='css'
            theme='monokai'
            onChange={setValue}
            editorProps={{ $blockScrolling: true }}
          />
          <AceEditor
            name='b'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 265px)',
            }}
            wrapEnabled={!keepBreaks}
            value={error || result}
            mode='css'
            theme='monokai'
            readOnly
            editorProps={{ $blockScrolling: true }}
          />
        </Stack>
        <Box
          component={'input'}
          id='fileInput'
          type='file'
          accept={'.css'}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>
    </MainContent>
  );
};

export default _C;
