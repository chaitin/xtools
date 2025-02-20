import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TranslateIcon from '@mui/icons-material/Translate';
import MainContent from '@/components/MainContent';
import alertActions from '@/components/Alert';

const encode = (text: string, pwdOffest: number) => {
  if (pwdOffest >= 26) pwdOffest %= 26;
  return Array.from(text)
    .map((item) => {
      const count = item.charCodeAt(0);
      if ((count >= 97 && count <= 122) || (count >= 65 && count <= 90)) {
        if (
          count + pwdOffest > 122 ||
          (count <= 90 && count + pwdOffest > 90)
        ) {
          return String.fromCharCode(count + pwdOffest - 26);
        }
        return String.fromCharCode(count + pwdOffest);
      }
      return item;
    })
    .join('');
};
const decode = (pwd: string, pwdOffest: number) => {
  if (pwdOffest >= 26) pwdOffest %= 26;
  return Array.from(pwd)
    .map((item) => {
      const count = item.charCodeAt(0);
      if ((count >= 97 && count <= 122) || (count >= 65 && count <= 90)) {
        if (count - pwdOffest < 65 || (count >= 97 && count - pwdOffest < 97)) {
          return String.fromCharCode(count - pwdOffest + 26);
        }
        return String.fromCharCode(count - pwdOffest);
      }
      return item;
    })
    .join('');
};
const CaesarCodeTranslator = () => {
  const [text, setText] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdOffest, setPwdOffest] = useState(3);

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onPwdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPwd(event.target.value);
  };

  const encodeToMorse = () => {
    try {
      const encoded = encode(text, pwdOffest);
      setPwd(encoded);
    } catch (error) {
      const err = error as Error;
      console.log(err);
      alertActions.error('加密失败！');
    }
  };

  const decodeFromMorse = () => {
    try {
      const decoded = decode(pwd, pwdOffest);
      setText(decoded);
    } catch (error) {
      const err = error as Error;
      console.log(err);
      alertActions.error('解密失败！');
    }
  };

  return (
    <MainContent>
      <>
        <TextField
          fullWidth
          label='密码位移数'
          placeholder='请输入密码位移的数值'
          value={pwdOffest}
          type='number'
          onChange={(e) => {
            setPwdOffest(e.target.value as any);
          }}
          inputProps={{
            style: { fontFamily: 'monospace' },
          }}
          sx={{ width: '200px', ml: 'auto' }}
        />
        <Container maxWidth='lg'>
          <Box sx={{ my: 4 }}>
            <Grid container spacing={2} alignItems='center'>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label='文本'
                  placeholder='请输入要加密的文本'
                  value={text}
                  onChange={onTextChange}
                  variant='outlined'
                  multiline
                  rows={10}
                  inputProps={{
                    style: { fontFamily: 'monospace' },
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={2}
                container
                direction='column'
                alignItems='center'
                justifyContent='space-around'
              >
                <Button
                  variant='contained'
                  onClick={encodeToMorse}
                  startIcon={<SendIcon />}
                  sx={{ mb: 2 }}
                >
                  加密
                </Button>
                <Button
                  variant='contained'
                  onClick={decodeFromMorse}
                  startIcon={<TranslateIcon />}
                >
                  解密
                </Button>
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label='凯撒密码'
                  placeholder='请输入要解密的凯撒密码'
                  value={pwd}
                  onChange={onPwdChange}
                  variant='outlined'
                  multiline
                  rows={10}
                  inputProps={{
                    style: { fontFamily: 'monospace' },
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Container>
      </>
    </MainContent>
  );
};

export default CaesarCodeTranslator;
