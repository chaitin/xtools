import MainContent from '@/components/MainContent';
import crypto from 'crypto-js';
import React, { useCallback, useMemo, useState } from 'react';
import { Box, Stack, Typography, Tab } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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
  const [src, setSrc] = useState<string>('');
  const [method, setMethod] = React.useState('encode');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, method: string) => {
    setMethod(method);
  };

  const methods = useMemo(() => {
    return (val: any) => {
      return [
        {
          name: 'MD5 - 16 位',
          value: crypto.MD5(val).toString().substr(8, 16),
        },
        { name: 'MD5 - 32 位', value: crypto.MD5(val).toString() },
        { name: 'SHA1', value: crypto.SHA1(val).toString() },
        { name: 'SHA224', value: crypto.SHA224(val).toString() },
        { name: 'SHA256', value: crypto.SHA256(val).toString() },
        { name: 'SHA3', value: crypto.SHA3(val).toString() },
        { name: 'SHA384', value: crypto.SHA384(val).toString() },
        { name: 'SHA512', value: crypto.SHA512(val).toString() },
      ];
    };
  }, []);

  const initValue = methods('').map((x) => {
    return { name: x.name, value: '' };
  });

  const [values, setValues] = useState(initValue);

  let outElements = values.map((x) => {
    return (
      <TextField
        key={x.name}
        size='small'
        value={x.value}
        variant='outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              sx={{ width: '150px', fontFamily: 'Mono' }}
            >
              {x.name}
            </InputAdornment>
          ),
          readOnly: true,
        }}
        sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
      />
    );
  });

  const onSrcChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSrc(event.target.value);
      setValues(methods(event.target.value));
    },
    [setValues]
  );

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target !== null) {
            const data = crypto.lib.WordArray.create(
              new Uint8Array(e.target.result as ArrayBuffer) as any
            );
            setValues(methods(data));
            setLoading(false);
          }
        };
        reader.readAsArrayBuffer(files[0]);
      }, 200);
    },
    [setValues]
  );

  return (
    <MainContent>
      <Box>
        <TabContext value={method}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab
                label='文本'
                value='encode'
                sx={{ textTransform: 'none !important' }}
              />
              <Tab
                label='文件'
                value='decode'
                sx={{ textTransform: 'none !important' }}
              />
            </TabList>
          </Box>
          <TabPanel value='encode' sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Typography variant='subtitle2'>输入</Typography>
            <TextField
              value={src}
              variant='outlined'
              multiline
              rows={3}
              fullWidth
              onChange={onSrcChange}
              sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' } }}
            />
          </TabPanel>
          <TabPanel value='decode' sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Typography variant='subtitle2'>输入</Typography>
            <Box sx={{ position: 'relative', alignSelf: 'flex-start' }}>
              <LoadingButton
                loading={loading}
                loadingPosition='start'
                size='small'
                sx={{ borderRadius: '4px' }}
                variant='contained'
                startIcon={<CloudUploadIcon />}
              >
                {!loading ? '选择文件' : '正在计算'}
              </LoadingButton>
              <VisuallyHiddenInput
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  clipPath: 'none',
                  clip: 'unset',
                  opacity: '0',
                  cursor: 'pointer',
                }}
                type='file'
                onChange={handleSelectFile}
              />
            </Box>
          </TabPanel>
        </TabContext>
        <Typography variant='subtitle2'>输出</Typography>
        <Stack spacing={1}>{outElements}</Stack>
      </Box>
    </MainContent>
  );
};

export default Hash;
