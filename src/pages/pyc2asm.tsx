import MainContent from '@/components/MainContent';
import { Box, Button } from '@mui/material';
import TextFieldWithCopy from '@/components/TextFieldWithCopy';
import React, { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import wasm from '@/asset/wasm/pycdas.js';

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

const Pyc2py: React.FC = () => {
  useEffect(() => {
    console.log(wasm);
  }, []);
  const [fileName, setFileName] = useState<string>('');
  const [result, setResult] = useState<string>('未加载文件');

  const matchContent = (filename: string, arr: ArrayBuffer) => {
    var result = wasm.ccall(
      'decompile',
      'string',
      ['string', 'array', 'number'],
      [filename, new Uint8Array(arr, 0, arr.byteLength), arr.byteLength]
    );
    return result;
  };

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      const file = files[0];
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target !== null) {
          setResult(matchContent(file.name, e.target.result as ArrayBuffer));
        }
      };
      setFileName(file.name);
      reader.readAsArrayBuffer(file);
    },
    []
  );

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
        <Box sx={{ height: '20px' }} />
        {fileName ? (
          <TextFieldWithCopy
            value={result}
            label='反汇编结果'
            minRows={10}
            maxRows={Infinity}
            multiline
            style={{ width: '100%' }}
            InputProps={{ readOnly: true }}
            sx={{
              width: '100%',
              textarea: { fontSize: '14px', fontFamily: 'Mono' },
            }}
            variant={'outlined'}
          />
        ) : (
          <></>
        )}
      </Box>
    </MainContent>
  );
};

export default Pyc2py;
