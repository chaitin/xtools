import MenuView from '@/components/MenuView';
import { Box, Stack, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import bigInt from 'big-integer';
import React, { useState } from 'react';

const RadixConvert: React.FC = () => {
  const radixList = [
    10, 2, 8, 16, 3, 4, 5, 6, 7, 9, 11, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22,
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
  ];
  const splitAt = 4;

  let [valueArray, setValueArray] = useState(
    Array<string>(radixList.length).fill('0')
  );

  const onValueChange = (radixList: number[], value: bigInt.BigInteger) => {
    radixList.forEach((targetRadix, index) => {
      let targetValue = value.toString(targetRadix);
      valueArray[index] = targetValue;
      setValueArray([...valueArray]);
    });
  };

  const addPrefix = (value: string, radix: number) => {
    switch (radix) {
      case 2:
        return '0b' + value;
      case 8:
        return '0o' + value;
      case 16:
        return '0x' + value;
      default:
        return value;
    }
  };

  const removePrefix = (value: string, radix: number) => {
    switch (radix) {
      case 2:
        return value.slice(2);
      case 8:
        return value.slice(2);
      case 16:
        return value.slice(2);
      default:
        return value;
    }
  };

  const ceilTo = (value: number, radix: number) => {
    switch (radix) {
      case 2:
        return Math.ceil(value / 4) * 4;
      case 8:
        return Math.ceil(value / 3) * 3;
      case 16:
        return Math.ceil(value / 2) * 2;
      default:
        return value;
    }
  };

  const padStart = (value: string, radix: number) => {
    let maxLen = ceilTo(value.length, radix);
    switch (radix) {
      case 2:
        return value.padStart(maxLen, '0');
      case 8:
        return value.padStart(maxLen, '0');
      case 16:
        return value.padStart(maxLen, '0');
      default:
        return value;
    }
  };

  const valueChange = (value: string, radix: number) => {
    let rawValue = removePrefix(value, radix);
    let newValue = rawValue == '' ? '0' : rawValue;
    try {
      let intValue = bigInt(newValue, radix);
      onValueChange(radixList, intValue);
    } catch (_) {
      console.log('invalid input: ' + newValue + ' in radix ' + radix + '');
    }
  };

  let activeElements = radixList.slice(0, splitAt).map((radix, index) => {
    return (
      <TextField
        key={radix}
        value={addPrefix(padStart(valueArray[index], radix), radix)}
        size='small'
        onChange={(event) => {
          valueChange(event.target.value, radix);
        }}
        variant='outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              sx={{ width: '70px', fontFamily: 'Mono' }}
            >
              {radix + ' 进制'}
            </InputAdornment>
          ),
        }}
        sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
      />
    );
  });

  let inactiveElements = radixList.slice(splitAt).map((radix, index) => {
    return (
      <TextField
        key={radix}
        value={addPrefix(padStart(valueArray[splitAt + index], radix), radix)}
        size='small'
        onChange={(event) => {
          valueChange(event.target.value, radix);
        }}
        variant='outlined'
        InputProps={{
          startAdornment: (
            <InputAdornment
              position='start'
              sx={{ width: '70px', fontFamily: 'Mono' }}
            >
              {radix + ' 进制'}
            </InputAdornment>
          ),
        }}
        sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
      />
    );
  });

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
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Typography variant='h6' component='h2'>
            常用进制
          </Typography>
          <Stack spacing={1} sx={{}}>
            {activeElements}
          </Stack>
        </Box>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Typography variant='h6' component='h2'>
            非常用进制
          </Typography>
          <Stack spacing={1} sx={{}}>
            {inactiveElements}
          </Stack>
        </Box>
      </Stack>
    </MenuView>
  );
};

export default RadixConvert;
