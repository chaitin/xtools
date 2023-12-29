import MainContent from '@/components/MainContent';
import { Box, Button, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState, useRef } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Wrap = styled('div')({
  width: '100%',
  marginTop: '20px',
});

const Ping: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [isPing, setIsPing] = useState<boolean>(false);
  const [result, setResult] = useState<string[]>([]);
  const isPingRef = useRef<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const computingTime = (startTime: number) => {
    const nowDate = new Date();
    var timec = (
      nowDate.getMinutes() * 60 +
      nowDate.getSeconds() +
      nowDate.getMilliseconds() / 1000 -
      startTime
    ).toFixed(2);
    if (+timec > 20) {
      setResult((result) => [...result, `${url} ping timeout`]);
    } else {
      setResult((result) => [...result, `${url} ping ${timec}ms`]);
    }
    if (isPingRef.current) {
      timerRef.current = setTimeout(runPing, 1000 - +timec);
    }
  };

  const runPing = () => {
    const urlDate = new Date();
    const startTime =
      urlDate.getMinutes() * 60 +
      urlDate.getSeconds() +
      urlDate.getMilliseconds() / 1000;
    const img = new Image();
    img.src = url + '/' + Math.random();
    img.onload = () => {
      computingTime(startTime);
    };
    img.onerror = () => {
      computingTime(startTime);
    };
  };

  function pingURL(url: string) {
    if (!url) return;
    if (isPing) {
      isPingRef.current = false;
      setIsPing(false);
      clearTimeout(timerRef.current!);
    } else {
      setResult([]);
      isPingRef.current = true;
      setIsPing(true);
      runPing();
    }
  }

  return (
    <MainContent>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Stack direction='row' spacing={3}>
          <TextField
            value={url}
            variant='outlined'
            size='small'
            autoComplete='off'
            label='url'
            sx={{ flex: 1 }}
            color={isPing ? 'error' : 'primary'}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button
            component='label'
            variant='outlined'
            onClick={() => pingURL(url)}
          >
            {isPing ? 'stop' : 'ping'}
          </Button>
        </Stack>
        <Wrap>
          {result.length > 0 && (
            <SyntaxHighlighter
              language={'text'}
              style={anOldHope}
              customStyle={{ paddingRight: '24px', maxHeight: '700px' }}
              showLineNumbers
            >
              {result.join('\n') || ''}
            </SyntaxHighlighter>
          )}
        </Wrap>
      </Box>
    </MainContent>
  );
};

export default Ping;
