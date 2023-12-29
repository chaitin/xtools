import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TranslateIcon from '@mui/icons-material/Translate';
import { encode, decode } from 'xmorse';
import MainContent from '@/components/MainContent';
import alertActions from '@/components/Alert';

const MorseCodeTranslator = () => {
  const [text, setText] = useState('');
  const [morse, setMorse] = useState('');

  const onTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onMorseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMorse(event.target.value);
  };

  const encodeToMorse = () => {
    try {
      const encoded = encode(text, { space: ' ' });
      setMorse(encoded);
    } catch (error) {
      const err = error as Error;
      console.log(err);
      alertActions.error('加密失败！');
    }
  };

  const decodeFromMorse = () => {
    try {
      const decoded = decode(morse, { space: ' ' });
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
                  label='摩斯电码'
                  placeholder='请输入要解密的摩斯电码'
                  value={morse}
                  onChange={onMorseChange}
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

export default MorseCodeTranslator;
