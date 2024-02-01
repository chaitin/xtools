import React, { useState } from 'react';
import { Container, Grid, TextField, Button, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TranslateIcon from '@mui/icons-material/Translate';
import coreValuesEncoder from '@/utils/core-values-encoder';
import MainContent from '@/components/MainContent';
import alertActions from '@/components/Alert';

const Cvencode = () => {
  const [text, setText] = useState('');
  const [encryptedText, setEncryptedText] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleEncryptedTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEncryptedText(event.target.value);
  };

  const handleEncode = () => {
    try {
      const encoded = coreValuesEncoder.encode(text);
      setEncryptedText(encoded);
    } catch (error) {
      const err = error as Error;
      console.log(err);
      alertActions.error('加密失败！');
    }
  };

  const handleDecode = () => {
    try {
      const decoded = coreValuesEncoder.decode(encryptedText);
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
                  label='待加密文本'
                  placeholder='请输入要加密的文本'
                  value={text}
                  onChange={handleTextChange}
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
                  onClick={handleEncode}
                  startIcon={<SendIcon />}
                  sx={{ mb: 2 }}
                >
                  加密
                </Button>
                <Button
                  variant='contained'
                  onClick={handleDecode}
                  startIcon={<TranslateIcon />}
                >
                  解密
                </Button>
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField
                  fullWidth
                  label='社会主义核心价值观编码'
                  placeholder='请输入要解密的编码文本'
                  value={encryptedText}
                  onChange={handleEncryptedTextChange}
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

export default Cvencode;
