import alert from '@/components/Alert';
import MainContent from '@/components/MainContent';
import TextFieldWithClean from '@/components/TextFieldWithClean';
import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const ShuffleTextGenerator: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [randomText, setRandomText] = useState<string>('');

  const handleRandomText = () => {
    const arr = text.split('\n');
    const randomArr = arr.map((item) =>
      Array.from(item)
        .sort(() => 0.5 - Math.random())
        .join('')
    );
    setRandomText(randomArr.join('\n'));
  };
  const handleRandomParagraph = () => {
    const arr = text.split('\n');
    const randomArr = arr.sort(() => 0.5 - Math.random());
    setRandomText(randomArr.join('\n'));
  };
  const handleCopyClick = () => {
    alert.success('已复制到剪切板');
  };
  return (
    <MainContent>
      <Stack spacing={2} sx={{ pt: 2 }}>
        <TextFieldWithClean
          multiline
          size='small'
          label={'原文'}
          minRows={5}
          variant='outlined'
          value={text}
          onChange={(event) => {
            setText(event.target.value);
          }}
          onClean={() => {
            setText('');
          }}
          sx={{ input: { fontSize: '14px', fontFamily: 'Mono' } }}
        />
        <Stack direction='row' spacing={2}>
          <Button
            variant='contained'
            sx={{ alignSelf: 'flex-start', borderRadius: '4px' }}
            onClick={handleRandomText}
          >
            文字乱序
          </Button>
          <Button
            variant='contained'
            sx={{ alignSelf: 'flex-start', borderRadius: '4px' }}
            onClick={handleRandomParagraph}
          >
            段落乱序
          </Button>
        </Stack>
        <pre style={{ position: 'relative' }}>
          结果:
          <br />
          {randomText}
          <CopyToClipboard text={randomText}>
            <ContentCopyIcon
              fontSize='small'
              sx={{ cursor: 'pointer', position: 'absolute', right: 0, top: 0 }}
              onClick={handleCopyClick}
            />
          </CopyToClipboard>
        </pre>
      </Stack>
    </MainContent>
  );
};

export default ShuffleTextGenerator;
