import MainContent from '@/components/MainContent';
import { Box, Grid, Slider, Stack, Button, Typography } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

import React, { useCallback, useEffect, useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import alert from '@/components/Alert';

const RandomUUID: React.FC = () => {
  const [UUIDCount, setUUIDCount] = useState<number>(44);
  const [UUIDList, setUUIDList] = useState<Array<string>>([]);

  const generateUUIDs = (count: number) => {
    const newUUIDList = [];
    for (let i = 0; i < count; i++) {
      newUUIDList.push(uuidv4());
    }
    return newUUIDList;
  };

  const handleCountChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      const count = newValue as number;
      setUUIDCount(count);
      setUUIDList(generateUUIDs(count));
    },
    []
  );

  const handleClick = useCallback(() => {
    alert.success('复制密码成功');
  }, []);

  const copyToClipboard = () => {
    const textToCopy = UUIDList.join('\n');
    navigator.clipboard.writeText(textToCopy);
  };

  // Generate default UUIDs on component mount
  useEffect(() => {
    setUUIDList(generateUUIDs(UUIDCount));
  }, []);

  return (
    <MainContent>
      <Stack sx={{ mt: '30px', lineHeight: '24px' }}>
        <Box
          sx={{
            margin: 'auto',
            textAlign: 'center',
            width: '80%',
          }}
        >
          <Stack direction='row' alignItems='center' justifyContent='center'>
            <Grid
              container
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
              }}
            >
              <Grid item xs={2}>
                <Typography>UUID 数量</Typography>
              </Grid>
              <Grid item xs={8}>
                <Slider
                  size='small'
                  value={UUIDCount}
                  onChange={handleCountChange}
                  aria-label='Small'
                  valueLabelDisplay='auto'
                  max={100}
                />
              </Grid>
              <Grid item xs={2}>
                <Button variant='contained' onClick={copyToClipboard}>
                  一键复制
                </Button>
              </Grid>
            </Grid>
          </Stack>
        </Box>
        <Box sx={{ mt: '20px', textAlign: 'center' }}>
          <Grid container spacing={2} justifyContent='center'>
            {UUIDList.length > 0 ? (
              <Box sx={{ position: 'relative' }}>
                <SyntaxHighlighter
                  language={'text'}
                  style={anOldHope}
                  customStyle={{ paddingRight: '100px' }}
                  showLineNumbers
                >
                  {UUIDList.join('\r\n') || ''}
                </SyntaxHighlighter>
                <CopyToClipboard
                  text={UUIDList.join('\r\n')}
                  onCopy={handleClick}
                >
                  <ContentCopyIcon
                    color='primary'
                    sx={{
                      position: 'absolute',
                      right: '6px',
                      top: '6px',
                      cursor: 'pointer',
                      '& svg': {
                        width: '20px',
                        height: '20px',
                      },
                    }}
                    fontSize='small'
                  />
                </CopyToClipboard>
              </Box>
            ) : null}
          </Grid>
        </Box>
      </Stack>
    </MainContent>
  );
};

export default RandomUUID;
