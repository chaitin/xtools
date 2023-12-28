import MainContent from '@/components/MainContent';
import {
  Box,
  Grid,
  Slider,
  Paper,
  Stack,
  Button,
  Typography,
} from '@mui/material';

import React, { useCallback, useEffect, useState } from 'react';

function generateRandomIP() {
  const part1 = Math.floor(Math.random() * 256);
  const part2 = Math.floor(Math.random() * 256);
  const part3 = Math.floor(Math.random() * 256);
  const part4 = Math.floor(Math.random() * 256);

  return `${part1}.${part2}.${part3}.${part4}`;
}

const RandomIP: React.FC = () => {
  const [ipCount, setIPCount] = useState<number>(44);
  const [ipList, setIPList] = useState<Array<string>>([]);

  const generateIPs = (count: number) => {
    const newIPList = [];
    for (let i = 0; i < count; i++) {
      newIPList.push(generateRandomIP());
    }
    return newIPList;
  };

  const handleCountChange = useCallback(
    (event: Event, newValue: number | number[]) => {
      const count = newValue as number;
      setIPCount(count);
      setIPList(generateIPs(count));
    },
    []
  );

  const copyToClipboard = () => {
    const textToCopy = ipList.join('\n');
    navigator.clipboard.writeText(textToCopy);
  };

  // Generate default IPs on component mount
  useEffect(() => {
    setIPList(generateIPs(ipCount));
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
                <Typography>IP 数量</Typography>
              </Grid>
              <Grid item xs={8}>
                <Slider
                  size='small'
                  value={ipCount}
                  onChange={handleCountChange}
                  aria-label='Small'
                  valueLabelDisplay='auto'
                  max={48}
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
            {ipList.map((ip, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Paper
                  elevation={3}
                  sx={{ padding: '10px', textAlign: 'center' }}
                >
                  {ip}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Stack>
    </MainContent>
  );
};

export default RandomIP;
