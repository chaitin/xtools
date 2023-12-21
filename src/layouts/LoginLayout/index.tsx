import React from 'react';
import Navbar from '@/layouts/Navbar';
import { Stack } from '@mui/material';
import Copyright from './copyright';
import { useMobileView } from '@/hooks';
import banner1 from '@/asset/img/banner1.webp';
import mobile_login from '@/asset/img/mobile_login.webp';
import Image from 'next/image';

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isMobile = useMobileView();
  return (
    <>
      <Navbar.login />
      <Stack
        id={'page-content-main'}
        sx={{ height: '100vh', overflow: 'overlay', position: 'relative' }}
      >
        <Image
          alt='background'
          src={isMobile ? mobile_login : banner1}
          style={{
            position: 'absolute',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />
        {children}
      </Stack>
      <Copyright />
    </>
  );
};

export default LoginLayout;
