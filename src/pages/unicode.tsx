import MainContent from '@/components/MainContent';
import TextFieldWithClean from '@/components/TextFieldWithClean';
import TextFieldWithCopy from '@/components/TextFieldWithCopy';
import SendIcon from '@mui/icons-material/Send';
import TranslateIcon from '@mui/icons-material/Translate';
import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';

function UnicodeConverter() {
  const [input, setInput] = useState(''); // 输入的普通文本或unicode码
  const [output, setOutput] = useState(''); // 输出的unicode码或普通文本

  // Unicode编码函数
  const encodeToUnicode = (str: string) => {
    let unicode_str = '';
    for (let i = 0; i < str.length; i++) {
      let unicode_code = str.charCodeAt(i).toString(16).toUpperCase();
      unicode_str += '\\u' + ('0000' + unicode_code).slice(-4);
    }
    setOutput(unicode_str);
  };

  // Unicode解码函数
  const decodeFromUnicode = (unicode_str: string) => {
    let str = '';
    unicode_str.replace(
      /\\u([\da-f]{4})/gi,
      (match, key) => (str += String.fromCharCode(parseInt(key, 16)))
    );
    setOutput(str);
  };

  // 渲染组件
  return (
    <MainContent>
      <Stack spacing={2} direction='row' alignItems='center'>
        <TextFieldWithClean
          multiline
          rows={8}
          value={input}
          variant='outlined'
          onClean={() => setInput('')}
          onChange={(e) => setInput(e.target.value)}
        />
        <Box sx={{ minWidth: '88px' }}>
          <Button
            variant='contained'
            startIcon={<SendIcon />}
            sx={{ mb: 2 }}
            onClick={() => encodeToUnicode(input)}
          >
            转码
          </Button>
          <Button
            variant='contained'
            startIcon={<TranslateIcon />}
            onClick={() => decodeFromUnicode(input)}
          >
            解码
          </Button>
        </Box>
        <TextFieldWithCopy
          multiline
          rows={8}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          variant={'outlined'}
        />
      </Stack>
    </MainContent>
  );
}

export default UnicodeConverter;
