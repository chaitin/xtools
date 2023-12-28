import React, { useState, useCallback, useEffect } from 'react';
import MainContent from '@/components/MainContent';

import { Box, Typography, Slider, Button, Grid } from '@mui/material';
import alert from '@/components/Alert';

const Browsers = [
  'Mozilla/5.0',
  'AppleWebKit/537.36',
  'Chrome/90.0.4430.85',
  'Safari/537.36',
];
const OSes = [
  'Windows NT 10.0; Win64; x64',
  'Macintosh; Intel Mac OS X 10_15_7',
  'X11; Linux x86_64',
];
const Versions = ['rv:11.0', 'KHTML, like Gecko', 'Edge/17.17134'];

const UserAgentGenerator: React.FC = () => {
  const [agentsCount, setAgentsCount] = useState<number>(26);
  const [userAgents, setUserAgents] = useState<string[]>([]);

  useEffect(() => {
    generateAgents();
  }, [agentsCount]);

  const changeAgentCount = useCallback(
    (event: Event, newValue: number | number[]) => {
      setAgentsCount(newValue as number);
    },
    []
  );

  const generateAgents = useCallback(() => {
    let agents = [];
    for (let i = 0; i < agentsCount; i++) {
      const Browser = Browsers[Math.floor(Math.random() * Browsers.length)];
      const OS = OSes[Math.floor(Math.random() * OSes.length)];
      const Version = Versions[Math.floor(Math.random() * Versions.length)];
      const userAgentString = `${Browser} (compatible; ${OS}) ${Version}`;
      agents.push(userAgentString);
    }
    setUserAgents(agents);
  }, [agentsCount]);

  const copyToClipboard = useCallback(() => {
    const element = document.createElement('textarea');
    element.value = userAgents.join('\n');
    document.body.appendChild(element);
    element.select();
    document.execCommand('copy');
    document.body.removeChild(element);
    alert.success('已复制到剪切板');
  }, [userAgents]);

  return (
    <MainContent>
      <Box sx={{ width: '100%', height: '100%' }}>
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <Slider
              value={agentsCount}
              onChange={changeAgentCount}
              aria-labelledby='continuous-slider'
              min={1}
              max={200}
              sx={{ width: '95%' }}
            />
          </Grid>
          <Grid item xs={2}>
            共 {agentsCount} 个
          </Grid>
        </Grid>

        <Box
          sx={{
            width: '100%',
            // height: 'auto',
            maxHeight: '66vh',
            bgcolor: 'black',
            color: 'white',
            mt: '20px',
            p: '15px',
            overflowY: 'scroll',
          }}
        >
          <Button
            variant='outlined'
            size='small'
            color='primary'
            onClick={copyToClipboard}
            sx={{ float: 'right' }}
          >
            一键复制
          </Button>
          {userAgents.map((agent, index) => (
            <Typography key={index}>{agent}</Typography>
          ))}
        </Box>
      </Box>
    </MainContent>
  );
};

export default UserAgentGenerator;
