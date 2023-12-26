import MenuView from '@/components/MainContent';
import crypto from 'crypto-js';

import { Box, Stack, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

import TextField from '@mui/material/TextField';

import React, { useCallback, useState } from 'react';

const Hash: React.FC = () => {
  const [src, setSrc] = useState<string>('');

  const methods = [
    'MD5 - 16 位',
    'MD5 - 32 位',
    'SHA1',
    'SHA224',
    'SHA256',
    'SHA3',
    'SHA384',
    'SHA512',
  ];

  const [values] = useState(
    methods.map((name) => {
      return { name: name, value: '' };
    })
  );

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

  const setValue = useCallback(
    (name: string, value: string) => {
      values[methods.indexOf(name)].value = value;
      return value;
    },
    [values]
  );

  const onSrcChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSrc(event.target.value);
      setValue(
        'MD5 - 16 位',
        crypto.MD5(event.target.value).toString().substr(8, 16)
      );
      setValue('MD5 - 32 位', crypto.MD5(event.target.value).toString());
      setValue('SHA1', crypto.SHA1(event.target.value).toString());
      setValue('SHA224', crypto.SHA224(event.target.value).toString());
      setValue('SHA256', crypto.SHA256(event.target.value).toString());
      setValue('SHA3', crypto.SHA3(event.target.value).toString());
      setValue('SHA384', crypto.SHA384(event.target.value).toString());
      setValue('SHA512', crypto.SHA512(event.target.value).toString());
    },
    [setValue]
  );

  return (
    <MenuView>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Stack spacing={1}>
          <Typography variant='subtitle2'>输入</Typography>
          <TextField
            value={src}
            variant='outlined'
            multiline
            rows={3}
            onChange={onSrcChange}
            sx={{ textarea: { fontSize: '14px', fontFamily: 'Mono' } }}
          />
          <br></br>
          输出
          <Stack spacing={1}>{outElements}</Stack>
        </Stack>
      </Box>
    </MenuView>
  );
};

export default Hash;
