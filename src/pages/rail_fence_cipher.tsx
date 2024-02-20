import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TranslateIcon from '@mui/icons-material/Translate';
import MainContent from '@/components/MainContent';
import alertActions from '@/components/Alert';

const encode = (text: string, rails: number) => {
  // 创建栅栏矩阵
  const fence: string[][] = Array.from({ length: rails }, () => []);

  // 将字符按照"W"字形排列到栅栏矩阵中
  let rail = 0;
  let direction = 1;
  for (let i of text) {
    fence[rail].push(i);
    rail += direction;
    if (rail === 0 || rail === rails - 1) {
      direction = -direction;
    }
  }

  // 按照特定顺序读取字符并拼接成密文
  let pwd = '';
  for (let i = 0; i < rails; i++) {
    pwd += fence[i].join('');
  }

  return pwd;
};

const decode = (pwd: string, rails: number) => {
  // 创建栅栏矩阵
  const fence: string[][] = Array.from({ length: rails }, () => []);

  // 计算栅栏中每行的字符数
  const railCounts = Array.from({ length: rails }, () => 0);
  let rail = 0;
  let direction = 1;
  for (let i = 0; i < pwd.length; i++) {
    railCounts[rail]++;
    rail += direction;
    if (rail === 0 || rail === rails - 1) {
      direction = -direction;
    }
  }

  // 将密文中的字符填充到栅栏矩阵中
  let index = 0;
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < railCounts[i]; j++) {
      fence[i].push(pwd[index]);
      index++;
    }
  }

  // 按照"山"字形顺序读取字符并拼接成明文
  let plaintext = '';
  rail = 0;
  direction = 1;
  for (let i = 0; i < pwd.length; i++) {
    plaintext += fence[rail].shift();
    rail += direction;
    if (rail === 0 || rail === rails - 1) {
      direction = -direction;
    }
  }

  return plaintext;
};
const RailFenceCipher = () => {
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
          label='栏目数'
          placeholder='请输入栏目数'
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
                  label='栅栏密码'
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

export default RailFenceCipher;
