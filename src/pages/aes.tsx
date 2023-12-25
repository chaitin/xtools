import MenuView from '@/components/MenuView';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import {
  Box,
  FormControlLabel,
  FormLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Tab,
  TextField,
  Typography,
} from '@mui/material';
import crypto from 'crypto-js';
import React, { useCallback } from 'react';

const AES: React.FC = () => {
  const [method, setMethod] = React.useState('encrypt');
  const [key, setKey] = React.useState('');
  const [iv, setIV] = React.useState('');
  const [src, setSrc] = React.useState('');
  const [dst, setDst] = React.useState('');
  const [mode, setMode] = React.useState('cbc');

  const handleMethodChange = (event: React.SyntheticEvent, method: string) => {
    setMethod(method);
    setKey('');
    setSrc('');
    setDst('');
    setMode('cbc');
  };

  const calc = useCallback(
    (src: string, key: string, mode: string, iv: string) => {
      //console.log(src, key, mode, iv)
      if (key === '' || src === '') {
        return '';
      }

      let k = crypto.enc.Utf8.parse(key);

      return (method === 'encrypt' ? crypto.AES.encrypt : crypto.AES.decrypt)(
        src,
        key,
        {
          iv: mode === 'cbc' ? crypto.enc.Utf8.parse(iv) : undefined,
          mode: mode === 'cbc' ? crypto.mode.CBC : crypto.mode.ECB,
          padding: crypto.pad.Pkcs7,
        }
      ).toString();
    },
    [method]
  );

  const onKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKey(event.target.value);
      setDst(calc(src, event.target.value, mode, iv));
    },
    [src, mode, iv, calc]
  );

  const onModeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMode(event.target.value);
      setDst(calc(src, key, event.target.value, iv));
    },
    [src, key, iv, calc]
  );

  const onSrcChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSrc(event.target.value);
      setDst(calc(event.target.value, key, mode, iv));
    },
    [key, mode, iv, calc]
  );

  const onIVChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIV(event.target.value);
      setDst(calc(src, key, mode, event.target.value));
    },
    [src, key, mode, calc]
  );

  const onDstChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDst(event.target.value);
    },
    []
  );

  return (
    <MenuView>
      <Stack
        sx={{
          mt: '24px',
          gap: '18px',
          maxWidth: '1020px',
          fontFamily: 'Mono',
          
          mx: 'auto',
        }}
      >
        <TabContext value={method}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleMethodChange}>
              <Tab
                label='加密'
                value='encrypt'
                sx={{ textTransform: 'none !important' }}
              />
              <Tab
                label='解密'
                value='decrypt'
                sx={{ textTransform: 'none !important' }}
              />
            </TabList>
          </Box>
        </TabContext>
        <TextField
          size='small'
          value={key}
          variant='outlined'
          onChange={onKeyChange}
          placeholder='建议为 16 位字符'
          InputProps={{
            startAdornment: (
              <InputAdornment
                position='start'
                sx={{ width: '100px', fontFamily: 'Mono' }}
              >
                {method === 'encrypt' ? '加密' : '解密'}密钥
              </InputAdornment>
            ),
          }}
          sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
        />
        {mode === 'cbc' ? (
          <TextField
            size='small'
            value={iv}
            variant='outlined'
            onChange={onIVChange}
            placeholder='建议为 16 位字符'
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position='start'
                  sx={{ width: '100px', fontFamily: 'Mono' }}
                >
                  IV
                </InputAdornment>
              ),
            }}
            sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
          />
        ) : (
          ''
        )}
        <Stack direction='row'>
          <FormLabel
            sx={{
              lineHeight: '42px',
              width: '100px',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            模式
          </FormLabel>
          <RadioGroup row value={mode} onChange={onModeChange}>
            <FormControlLabel value='cbc' control={<Radio />} label='CBC' />
            <FormControlLabel value='ecb' control={<Radio />} label='ECB' />
          </RadioGroup>
        </Stack>
        <Typography sx={{ marginTop: '10px' }}>
          {method === 'encrypt' ? '明文' : '密文'}
        </Typography>
        <TextField
          value={src}
          variant='outlined'
          multiline
          rows={3}
          onChange={onSrcChange}
          sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' } }}
        />
        <Typography sx={{ marginTop: '10px' }}>
          {method === 'encrypt' ? '密文' : '明文'}
        </Typography>
        <TextField
          value={dst}
          variant='outlined'
          multiline
          rows={3}
          onChange={onDstChange}
          InputProps={{ readOnly: true }}
          sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' } }}
        />
      </Stack>
    </MenuView>
  );
};

export default AES;
