import MainContent from '@/components/MainContent';

import {
  Alert,
  Box,
  Button,
  Grid,
  Snackbar,
  Stack,
  styled,
} from '@mui/material';

import TextField from '@mui/material/TextField';

import wasm from '@/asset/wasm/crackzip';

import React, { useCallback, useState } from 'react';

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

const Hash: React.FC = () => {
  const [fileName, setFileName] = useState<string>();
  const [data, setData] = useState<ArrayBuffer>(new ArrayBuffer(0));
  const [alphabet, setAlphabet] = useState<string>('1234567890');
  const [maxLength, setMaxLength] = useState<number>(8);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [ing, setIng] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>('');
  const [result, setResult] = useState<string>('');

  const handleMessageClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    setShowMessage(false);
  };

  const cnt = () => {
    let ab = Array.from(new Set(alphabet)).join('');
    let r = 0;
    for (let i = 1; i <= maxLength; i++) {
      r += Math.pow(ab.length, i);
    }
    return r;
  };

  const cost = () => {
    const s = cnt() / 800000;
    if (s > 3600) {
      return `${Math.floor(s / 3600)} 小时左右`;
    } else if (s > 60) {
      return `${Math.floor(s / 60)} 分钟左右`;
    } else {
      return `${Math.floor(s)} 秒左右`;
    }
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
        }
      };
      setFileName(files[0].name);
      reader.readAsArrayBuffer(files[0]);
    },
    []
  );

  const onAlphabetChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAlphabet(event.target.value);
    },
    []
  );

  const onMaxLengthChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const r = parseInt(event.target.value);
      if (r >= 1 && r <= 1000) {
        setMaxLength(r);
      }
    },
    []
  );

  const handleCrack = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (data.byteLength > 0 && cnt() / 1000 / 1000 / 1000 > 100) {
        message('计算量太大了，别破解了，没啥希望');
        //} else if (data.byteLength > 1024 * 50) {
        //  message('暂时还不支持破解超过 50 KB 的压缩包');
      } else {
        setIng(true);
        setResult('正在破解，有点慢，可能会有点卡，稍等等');
        setTimeout(() => {
          console.log(data);
          const p = wasm.ccall(
            'zouqi',
            'string',
            ['number', 'string', 'array', 'number'],
            [
              maxLength,
              ':' + alphabet.split('').sort().join(''),
              new Uint8Array(data, 0, data.byteLength),
              data.byteLength,
              //new Uint8Array(data, 0, Math.min(data.byteLength, 50 * 1024)),
              //Math.min(data.byteLength, 50 * 1024),
            ]
          );
          if (p) {
            setResult('破解成功，密码是 ' + p);
          } else {
            setResult('破解失败，文件不太对');
          }

          setIng(false);
        }, 100);
      }
    },
    [alphabet, maxLength, data]
  );

  const message = (x: string) => {
    setMessageContent(x);
    setShowMessage(true);
  };

  return (
    <MainContent>
      <Stack spacing={3} sx={{ color: '#FF1844' }}>
        <Button
          component='label'
          variant='outlined'
          sx={{ borderRadius: '3px', height: '40px' }}
        >
          {fileName ? '已加载文件 ' + fileName : '加载文件'}
          <VisuallyHiddenInput type='file' onChange={handleSelectFile} />
        </Button>
        <Grid container>
          <Grid item xs={10} sx={{ paddingRight: '20px' }}>
            <TextField
              size='small'
              value={alphabet}
              variant='outlined'
              label='密码字符集'
              onChange={onAlphabetChange}
              sx={{
                width: '100%',
                input: { fontSize: '14px', fontFamily: 'Mono' },
              }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              size='small'
              value={maxLength}
              variant='outlined'
              label='密码最大长度'
              onChange={onMaxLengthChange}
              type='number'
              InputProps={{
                inputProps: { min: 1, max: 1000 },
              }}
              sx={{
                width: '100%',
                input: { fontSize: '14px', fontFamily: 'Mono' },
              }}
            />
          </Grid>
        </Grid>
        <Box>
          将尝试 {cnt().toLocaleString('en-US')} 个密码，预计需要 {cost()}
        </Box>
        <Button
          size='small'
          sx={{
            borderRadius: '4px',
            marginBottom: '20px!important',
          }}
          component='label'
          variant='contained'
          color='primary'
          onClick={handleCrack}
        >
          {ing ? '正在破解，有点慢，可能会有点卡，稍等等' : '开始破解'}
        </Button>
        {result}
        <Snackbar
          open={showMessage}
          autoHideDuration={6000}
          onClose={handleMessageClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert variant='outlined' severity='error' sx={{ width: '100%' }}>
            {messageContent}
          </Alert>
        </Snackbar>
      </Stack>
    </MainContent>
  );
};

export default Hash;
