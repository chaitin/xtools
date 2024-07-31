'use client';

import React, { useEffect, useState } from 'react';
import { Box, AppBar, Stack, Link, Button } from '@mui/material';

import Search from './search';

const NAV_LINK = [
  {
    title: '行业百科',
    href: '/v3/wiki',
  },
  {
    title: '技术博客',
    href: '/v3/blog',
  },
  {
    title: '在线工具',
    href: '/tools',
    target: '_blank',
  },
  {
    title: '漏洞情报',
    href: '/v3/vuldb',
  },
];

const Header = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('/api/v1/user/profile', {
      credentials: 'include',
    }).then((res) => {
      res.json().then((data) => {
        setUser(data);
      });
    });
  }, []);

  return (
    <AppBar
      position='fixed'
      sx={{
        display: { xs: 'none', sm: 'block' },
        backgroundColor: '#fff',
        boxShadow: 'none',
        zIndex: 100,
      }}
    >
      <Stack
        direction='row'
        sx={{ height: 64, position: 'relative' }}
        alignItems='center'
        justifyContent='space-between'
      >
        <Stack direction='row' alignItems='center'>
          <Box
            component='img'
            src='/tools/logo.svg'
            onClick={() => {
              window.open('/', '_self');
            }}
            sx={{ ml: 5, mr: 10, cursor: 'pointer' }}
          />

          <Stack direction='row' gap={5} alignItems='center'>
            {NAV_LINK.map((item) => (
              <Box
                key={item.title}
                component={Link}
                color='#999'
                underline='none'
                onClick={(e) => {
                  e.preventDefault();
                  window.open(item.href, '_self');
                }}
                sx={{
                  fontSize: '16px',
                  color: '#041B0F',
                  fontWeight: 700,
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                {item.title}
              </Box>
            ))}
          </Stack>
        </Stack>

        <Stack
          direction='row'
          sx={{ position: 'absolute', top: 0, bottom: 0, right: 0 }}
        >
          <Search
            type='icon-button'
            SearchRoundedIconProps={{
              sx: {
                mt: '22px',
                mr: 2,
                color: '#000',
                fontSize: 20,
                cursor: 'pointer',
              },
            }}
          />
          {user ? (
            <Stack justifyContent='center' sx={{ pr: 3 }}>
              <Button
                variant='contained'
                sx={{ width: 102, boxShadow: 'none', borderRadius: 1 }}
                onClick={() => {
                  window.open('/workbench', '_self');
                }}
              >
                工作台
              </Button>
            </Stack>
          ) : (
            <>
              <Button
                sx={{ borderRadius: 0, px: 3 }}
                onClick={() => {
                  window.open('/login', '_self');
                }}
              >
                登录
              </Button>
              <Button
                variant='contained'
                sx={{ borderRadius: 0, px: 3 }}
                onClick={() => {
                  window.open('/register', '_self');
                }}
              >
                立即注册
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </AppBar>
  );
};

export default Header;
