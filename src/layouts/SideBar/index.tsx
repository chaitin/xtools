import { grayText } from '@/constant/color';
import { AnchorContext } from '@/hooks/useAnchor';
import { allTags } from '@/utils/tags';
import { Button, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';

const SideBar: React.FC<{}> = () => {
  const { anchor } = useContext(AnchorContext);
  const [linkAnchor, setLinkAnchor] = useState(false);
  const [checkAnchor, setChectAnchor] = useState('');
  useEffect(() => {
    if (linkAnchor) setLinkAnchor(false)
    else setChectAnchor(anchor);
  }, [anchor]);
  return (
    <Paper
      sx={{
        boxShadow:
          '0px 0px 2px 0px rgba(145,158,171,0.2), 0px 12px 24px -4px rgba(145,158,171,0.12)',
        borderRadius: '8px',
        width: '192px',
        height: '100%',
        overflow: 'auto',
        flexShrink: 0,
      }}
    >
      <Stack alignItems='center' sx={{ py: 1 }}>
        {allTags.map((item) => (
          <Link
            key={item.name}
            shallow
            onClick={() => {
              setChectAnchor(item.name)
              setLinkAnchor(true)
            }}
            href={'/#' + item.name}
            style={{ alignSelf: 'stretch' }}
            className='custom-link'
            prefetch
          >
            <Button
              sx={{
                pl: 3,
                height: '46px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Image
                alt={item.label}
                src={checkAnchor === item.name ? item.icon_check : item.icon}
              />
              <Typography
                variant='subtitle2'
                fontFamily='PingFangSC'
                sx={{
                  color: grayText,
                  fontWeight: checkAnchor === item.name ? 900 : 400,
                  ml: 1,
                }}
              >
                {item.label}
              </Typography>
            </Button>
          </Link>
        ))}
      </Stack>
    </Paper>
  );
};

export default SideBar;
