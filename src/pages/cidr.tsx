import MainContent from '@/components/MainContent';
import { Button, TextField, Grid, Typography } from '@mui/material';

import React, { useState, useEffect } from 'react';

function parseCIDR(ip: string, mask: number) {
  let ipArray = ip.split('.');
  let binaryIp = ipArray
    .map((oct) => parseInt(oct).toString(2).padStart(8, '0'))
    .join('');

  let networkAddress = binaryIp.substring(0, mask) + '0'.repeat(32 - mask);
  let broadcastAddress = binaryIp.substring(0, mask) + '1'.repeat(32 - mask);

  let firstUsable = parseInt(networkAddress, 2) + 1;
  let lastUsable = parseInt(broadcastAddress, 2) - 1;

  let netmask = '1'.repeat(mask) + '0'.repeat(32 - mask);
  let netmaskOctets = netmask.match(/.{1,8}/g);
  let subnetMask = netmaskOctets?.map((oct) => parseInt(oct, 2)).join('.');
  let totalUsable = Math.pow(2, 32 - mask) - 2;
  return {
    firstUsableIP: formatIp(firstUsable),
    lastUsableIP: formatIp(lastUsable),
    mask: subnetMask,
    totalUsable: totalUsable,
  };
}

function formatIp(num: number) {
  let parts = [];
  for (let i = 0; i < 4; i++) {
    parts.unshift((num >> (i * 8)) & 255);
  }
  return parts.join('.');
}

const CIDRCalculator: React.FC = () => {
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.1');
  const [subnetMask, setSubnetMask] = useState<number>(24);
  const [cidrDetails, setCidrDetails] = useState({
    mask: '',
    firstUsableIP: '',
    lastUsableIP: '',
    totalUsable: 0,
  });

  const calculateCIDR = () => {
    const details = parseCIDR(ipAddress, subnetMask);
    setCidrDetails({
      ...details,
      mask: details.mask || '',
    });
  };
  useEffect(() => {
    calculateCIDR();
  }, []);
  return (
    <MainContent>
      {/* <Paper elevation={3} sx={{ padding: '20px', marginTop: '20px' }}> */}
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            fullWidth
            label='IP 地址'
            variant='outlined'
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label='掩码位'
            type='number'
            variant='outlined'
            value={subnetMask}
            onChange={(e) => setSubnetMask(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={calculateCIDR}
          >
            Calculate
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle1' sx={{ mt: '15px', fontSize: '25px' }}>
            <a style={{ color: '#99A0B7' }}>子网掩码: </a>
            <strong style={{ marginLeft: '5px' }}>{cidrDetails.mask}</strong>
          </Typography>
          <Typography variant='subtitle1' sx={{ mt: '15px', fontSize: '25px' }}>
            <a style={{ color: '#99A0B7' }}>首个可用: </a>
            <strong style={{ marginLeft: '5px' }}>
              {cidrDetails.firstUsableIP}
            </strong>
          </Typography>
          <Typography variant='subtitle1' sx={{ mt: '15px', fontSize: '25px' }}>
            <a style={{ color: '#99A0B7' }}>最后可用: </a>
            <strong style={{ marginLeft: '5px' }}>
              {cidrDetails.lastUsableIP}
            </strong>
          </Typography>
          <Typography variant='subtitle1' sx={{ mt: '15px', fontSize: '25px' }}>
            <a style={{ color: '#99A0B7' }}>所有可用数量: </a>
            <strong style={{ marginLeft: '5px' }}>
              {cidrDetails.totalUsable}
            </strong>
          </Typography>
        </Grid>
      </Grid>
      {/* </Paper> */}
    </MainContent>
  );
};

export default CIDRCalculator;
