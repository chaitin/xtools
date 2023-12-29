import React, { useState, useEffect, useRef } from 'react';
import { TextField, Grid } from '@mui/material';
import MainContent from '@/components/MainContent';

function parseCIDR(ipParts: string[], mask: number) {
  let binaryIp = ipParts
    .map((oct) => parseInt(oct).toString(2).padStart(8, '0'))
    .join('');

  let networkAddress = binaryIp.substring(0, mask) + '0'.repeat(32 - mask);
  let broadcastAddress = binaryIp.substring(0, mask) + '1'.repeat(32 - mask);

  let firstUsable = parseInt(networkAddress, 2);
  let lastUsable = parseInt(broadcastAddress, 2);

  let netmask = '1'.repeat(mask) + '0'.repeat(32 - mask);
  let netmaskOctets = netmask.match(/.{1,8}/g);
  let subnetMask = netmaskOctets?.map((oct) => parseInt(oct, 2)).join('.');
  let totalUsable = Math.pow(2, 32 - mask);

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

const CIDRCalculator = () => {
  // Separate state variables for each IP segment
  const [ipPart1, setIpPart1] = useState('192');
  const [ipPart2, setIpPart2] = useState('168');
  const [ipPart3, setIpPart3] = useState('1');
  const [ipPart4, setIpPart4] = useState('1');
  const [subnetMask, setSubnetMask] = useState(24);
  const [cidrDetails, setCidrDetails] = useState({
    mask: '',
    firstUsableIP: '',
    lastUsableIP: '',
    totalUsable: 0,
  });

  // Refs for each input field
  const ipPartRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const subnetMaskRef = useRef(null);
  const [ip, setIp] = useState<string>('192.168.100.1');
  const [mask, setMask] = useState<number>(24);
  useEffect(() => {
    const ipParts = [ipPart1, ipPart2, ipPart3, ipPart4];
    const details = parseCIDR(ipParts, subnetMask);
    setCidrDetails({
      ...details,
      mask: details.mask || '',
    });
  }, [ipPart1, ipPart2, ipPart3, ipPart4, subnetMask]);

  const handleIpPartChange = (value: any, index: number) => {
    if (value.includes('.')) {
      if (value.includes('/')) {
        setIp(value.split('/')[0]);
        setMask(value.split('/')[1]);
      } else {
        setIp(value);
      }
      const newIpParts = ip.split('.');
      console.log(newIpParts, newIpParts.length === 4, !isNaN(mask), mask);
      if (newIpParts.length === 4 && !isNaN(mask)) {
        for (var i = 0; i < 4; i++) {
          const setIpPart = [setIpPart1, setIpPart2, setIpPart3, setIpPart4][i];
          console.log(newIpParts[i]);
          setIpPart(newIpParts[i]);
        }
        setSubnetMask(mask);
      }
    } else {
      const numericValue = parseInt(value, 10);

      if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 255) {
        const setIpPart = [setIpPart1, setIpPart2, setIpPart3, setIpPart4][
          index
        ];
        setIpPart(value);

        if (numericValue > 99 && index < 3) {
          ipPartRefs[index + 1]?.current?.focus();
        }
      }
    }
  };

  return (
    <MainContent>
      <Grid container spacing={2} alignItems='center' justifyContent='center'>
        {[ipPart1, ipPart2, ipPart3, ipPart4].map((part, index) => (
          <Grid key={index} item xs={2}>
            <TextField
              fullWidth
              variant='outlined'
              value={part}
              onChange={(e) => handleIpPartChange(e.target.value, index)}
              inputRef={ipPartRefs[index]}
            />
          </Grid>
        ))}
        <Grid item xs={0.35}>
          /
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label='Subnet Mask'
            type='number'
            variant='outlined'
            value={subnetMask}
            onChange={(e) => setSubnetMask(Number(e.target.value))}
            inputRef={subnetMaskRef}
          />
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems='center'
          sx={{ mt: '3vh', ml: '4vh' }}
        >
          <Grid item xs={2}>
            总计可用:
          </Grid>
          <Grid item xs={2}>
            <strong>{cidrDetails.totalUsable}</strong>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems='center'
          sx={{ mt: '3vh', ml: '4vh' }}
        >
          <Grid item xs={2}>
            掩码:
          </Grid>
          {cidrDetails.mask.split('.').map((part, index) => (
            <Grid key={index} item xs={2}>
              <TextField
                fullWidth
                variant='outlined'
                type='number'
                disabled
                value={part}
                onChange={(e) => handleIpPartChange(e.target.value, index)}
                inputRef={ipPartRefs[index]}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems='center'
          sx={{ mt: '3vh', ml: '4vh' }}
        >
          <Grid item xs={2}>
            首个可用:
          </Grid>
          {cidrDetails.firstUsableIP.split('.').map((part, index) => (
            <Grid key={index} item xs={2}>
              <TextField
                fullWidth
                variant='outlined'
                type='number'
                disabled
                value={part}
                onChange={(e) => handleIpPartChange(e.target.value, index)}
                inputRef={ipPartRefs[index]}
              />
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          spacing={2}
          alignItems='center'
          sx={{ mt: '3vh', ml: '4vh' }}
        >
          <Grid item xs={2}>
            最后可用:
          </Grid>
          {cidrDetails.lastUsableIP.split('.').map((part, index) => (
            <Grid key={index} item xs={2}>
              <TextField
                fullWidth
                variant='outlined'
                type='number'
                disabled
                value={part}
                onChange={(e) => handleIpPartChange(e.target.value, index)}
                inputRef={ipPartRefs[index]}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </MainContent>
  );
};

export default CIDRCalculator;
