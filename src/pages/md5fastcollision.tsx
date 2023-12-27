import MainContent from '@/components/MainContent';
import crypto from 'crypto-js';

import { Box, Button, Stack, Typography } from '@mui/material';


import wasm from '@/asset/wasm/fastcoll';

import TextField from '@mui/material/TextField';

import React, { useCallback, useMemo, useState } from 'react';

const Hash: React.FC = () => {
  const [ing, setIng] = useState<boolean>(false);
  const [src, setSrc] = useState<string>('');
  const [dst1, setDst1] = useState<string>('');
  const [dst2, setDst2] = useState<string>('');
  const [md5, setMd5] = useState<string>('');

  const methods = useMemo(() => {
    console.log(wasm);
    return [
    ];
  }, []);

  const onSrcChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSrc(event.target.value);
    },
    []
  );

  const handleCollision = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setIng(true)
      const arr = new TextEncoder().encode(src);
      const padding = new Uint8Array(arr.length % 64 === 0 ? 0 : 64 - (arr.length % 64));

      setTimeout(() => {
        const p = wasm.ccall(
          'collision',
          'number',
          ['array', 'number'],
          [arr, arr.byteLength]
        )
        console.log(p)
        console.log(wasm.HEAPU8)
        
        const dst1arr = new Uint8Array(arr.length + padding.length + 128);
        const dst2arr = new Uint8Array(arr.length + padding.length + 128);

        dst1arr.set(arr, 0)
        dst2arr.set(arr, 0)
        dst1arr.set(padding, arr.length)
        dst2arr.set(padding, arr.length)
        dst1arr.set(wasm.HEAPU8.slice(p, p + 128), arr.length + padding.length)
        dst2arr.set(wasm.HEAPU8.slice(p + 128, p + 256), arr.length + padding.length)

        setDst1(Buffer.from(dst1arr).toString('hex'))
        setDst2(Buffer.from(dst2arr).toString('hex'))
        setMd5(crypto.MD5(crypto.lib.WordArray.create(dst1arr as any)).toString())
        console.log(crypto.MD5(crypto.lib.WordArray.create(dst1arr as any)).toString())
        console.log(crypto.MD5(crypto.lib.WordArray.create(dst2arr as any)).toString())
        setIng(false)
      }, 100)
    },
    [src]
  );
  
  return (
    <MainContent>
        <Stack spacing={1}>
          <Typography variant='subtitle2'>原始前缀文本</Typography>
          <TextField
            value={src}
            variant='outlined'
            multiline
            rows={3}
            onChange={onSrcChange}
            sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' }, marginBottom: '20px!important' }}
          />
          <Button
                size='small'
                sx={{
                  borderRadius: '4px',
                  marginBottom: '20px!important'
                }}
                component='label'
                variant='contained'
                color='primary'
                onClick={handleCollision}
              >
            {ing ? '正在碰撞，有点慢，可能会有点卡，稍等等' : '开始碰撞'}
          </Button>
          <Typography variant='subtitle2'>碰撞文本 1</Typography>
          <TextField
            value={dst1}
            variant='outlined'
            multiline
            rows={4}
            sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' }, marginBottom: '20px!important' }}
          />
          <Typography variant='subtitle2'>碰撞文本 2</Typography>
          <TextField
            value={dst2}
            variant='outlined'
            multiline
            rows={4}
            sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' }, marginBottom: '20px!important' }}
          />
          <Typography variant='subtitle2'>MD5 哈希</Typography>
          <TextField
            size='small'
            value={md5}
            variant='outlined'
            sx={{ input: { fontSize: '14px', fontFamily: 'Mono' }, marginBottom: '20px!important' }}
          />
        </Stack>
    </MainContent>
  );
};

export default Hash;
