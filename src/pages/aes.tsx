import MainContent from '@/components/MainContent';
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
  const [padding, setPadding] = React.useState('ZeroPadding');
  const [encoding, setEncoding] = React.useState('Base64');

  const getMode = (mode: string) => {
    switch (mode) {
      case 'cbc':
        return crypto.mode.CBC;
      case 'cfb':
        return crypto.mode.CFB;
      case 'ofb':
        return crypto.mode.OFB;
      case 'ctr':
        return crypto.mode.CTR;
      case 'ecb':
        return crypto.mode.ECB;
      default:
        return crypto.mode.CBC;
    }
  };

  const getPadding = (padding: string) => {
    switch (padding) {
      case 'ZeroPadding':
        return crypto.pad.ZeroPadding;
      case 'Pkcs7':
        return crypto.pad.Pkcs7;
      case 'AnsiX923':
        return crypto.pad.AnsiX923;
      case 'Iso10126':
        return crypto.pad.Iso10126;
      case 'Iso97971':
        return crypto.pad.Iso97971;
      case 'NoPadding':
        return crypto.pad.NoPadding;
      default:
        return crypto.pad.ZeroPadding;
    }
  };

  const handleMethodChange = (event: React.SyntheticEvent, method: string) => {
    setMethod(method);
    setKey('');
    setIV('');
    setSrc('');
    setDst('');
    setMode('cbc');
    setPadding('ZeroPadding');
    setEncoding('Base64');
  };

  const calc = useCallback(
    (
      src: string,
      key: string,
      mode: string,
      padding: string,
      encoding: string,
      iv: string
    ) => {
      if (key === '' || src === '' || (mode !== 'ecb' && iv === '')) {
        return '';
      }

      if (key.length !== 16 && key.length !== 24 && key.length !== 32) {
        return '';
      }

      if (mode !== 'ecb' && iv.length !== 16) {
        return '';
      }

      let k = crypto.enc.Utf8.parse(key);

      let result;
      if (method === 'encrypt') {
        let plaintext = crypto.enc.Utf8.parse(src);
        let encrypted = crypto.AES.encrypt(plaintext, k, {
          iv: mode !== 'ecb' ? crypto.enc.Utf8.parse(iv) : undefined,
          mode: getMode(mode),
          padding: getPadding(padding),
        });
        result =
          encoding === 'Base64'
            ? encrypted.toString()
            : encrypted.ciphertext.toString();
      } else {
        let ciphertext =
          encoding === 'Base64'
            ? crypto.enc.Base64.parse(src)
            : crypto.enc.Hex.parse(src);
        let cipherParams = crypto.lib.CipherParams.create({
          ciphertext: ciphertext,
        });
        let decrypted = crypto.AES.decrypt(cipherParams, k, {
          iv: mode !== 'ecb' ? crypto.enc.Utf8.parse(iv) : undefined,
          mode: getMode(mode),
          padding: getPadding(padding),
        });
        try {
          result = decrypted.toString(crypto.enc.Utf8);
        } catch {
          result = '';
        }
      }
      return result;
    },
    [method]
  );

  const onKeyChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKey(event.target.value);
      setDst(calc(src, event.target.value, mode, padding, encoding, iv));
    },
    [src, mode, iv, padding, encoding, calc]
  );

  const onModeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMode(event.target.value);
      setDst(calc(src, key, event.target.value, padding, encoding, iv));
    },
    [src, key, iv, padding, encoding, calc]
  );

  const onSrcChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSrc(event.target.value);
      setDst(calc(event.target.value, key, mode, padding, encoding, iv));
    },
    [key, mode, iv, padding, encoding, calc]
  );

  const onIVChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setIV(event.target.value);
      setDst(calc(src, key, mode, padding, encoding, event.target.value));
    },
    [src, key, mode, padding, encoding, calc]
  );

  const onPaddingChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPadding(event.target.value);
      setDst(calc(src, key, mode, event.target.value, encoding, iv));
    },
    [src, key, mode, iv, encoding, calc]
  );

  const onEncodingChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEncoding(event.target.value);
      setDst(calc(src, key, mode, padding, event.target.value, iv));
    },
    [src, key, mode, iv, padding, calc]
  );

  const onDstChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setDst(event.target.value);
    },
    []
  );

  return (
    <MainContent>
      <>
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
          placeholder='建议为 16、24或32 位字符'
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
        {mode !== 'ecb' ? (
          <TextField
            size='small'
            value={iv}
            variant='outlined'
            onChange={onIVChange}
            placeholder={
              mode === 'ctr' ? '建议为 16 位字符的 Nonce' : '建议为 16 位字符'
            }
            InputProps={{
              startAdornment: (
                <InputAdornment
                  position='start'
                  sx={{ width: '100px', fontFamily: 'Mono' }}
                >
                  {mode === 'ctr' ? 'Nonce' : 'IV'}
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
            <FormControlLabel value='cfb' control={<Radio />} label='CFB' />
            <FormControlLabel value='ofb' control={<Radio />} label='OFB' />
            <FormControlLabel value='ctr' control={<Radio />} label='CTR' />
            <FormControlLabel value='ecb' control={<Radio />} label='ECB' />
          </RadioGroup>
        </Stack>
        <Stack direction='row'>
          <FormLabel
            sx={{
              lineHeight: '42px',
              width: '100px',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            填充
          </FormLabel>
          <RadioGroup row value={padding} onChange={onPaddingChange}>
            <FormControlLabel
              value='ZeroPadding'
              control={<Radio />}
              label='ZeroPadding'
            />
            <FormControlLabel value='Pkcs7' control={<Radio />} label='Pkcs7' />
            <FormControlLabel
              value='AnsiX923'
              control={<Radio />}
              label='AnsiX923'
            />
            <FormControlLabel
              value='Iso10126'
              control={<Radio />}
              label='Iso10126'
            />
            <FormControlLabel
              value='Iso97971'
              control={<Radio />}
              label='Iso97971'
            />
            <FormControlLabel
              value='NoPadding'
              control={<Radio />}
              label='NoPadding'
            />
          </RadioGroup>
        </Stack>
        <Stack direction='row'>
          <FormLabel
            sx={{
              lineHeight: '42px',
              width: '100px',
              color: 'rgba(0, 0, 0, 0.87)',
            }}
          >
            编码
          </FormLabel>
          <RadioGroup row value={encoding} onChange={onEncodingChange}>
            <FormControlLabel
              value='Base64'
              control={<Radio />}
              label='Base64'
            />
            <FormControlLabel value='Hex' control={<Radio />} label='Hex' />
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
      </>
    </MainContent>
  );
};

export default AES;
