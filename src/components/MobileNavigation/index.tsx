import { grayText } from '@/constant/color';
import { AnchorContext } from '@/hooks/useAnchor';
import { allTags } from '@/utils/tags';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Drawer, IconButton, Stack, Typography, Button } from '@mui/material';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useLocalStorageState } from 'ahooks';

const MobileNavigation: React.FC<{}> = () => {
  const { anchor } = useContext(AnchorContext);
  const [isOpen, setIsOpen] = useState(false);
  const [linkAnchor, setLinkAnchor] = useState(false);
  const [checkAnchor, setCheckAnchor] = useState('');
  const [, setScrollTop] = useLocalStorageState<number>('home_scrollTop', {
    defaultValue: 0,
  });

  useEffect(() => {
    if (linkAnchor) setLinkAnchor(false);
    else setCheckAnchor(anchor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchor]);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <IconButton
        onClick={handleToggle}
        sx={{
          display: isOpen ? 'none' : 'inline-flex',
          position: 'fixed',
          top: 'calc(84px / 2 - 20px)',
          right: 16,
          zIndex: 1300,
          backgroundColor: 'white',
          boxShadow: '0px 2px 8px rgba(0,0,0,0.15)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.04)',
          },
        }}
        aria-label={isOpen ? 'menu-hidden' : 'open-menu'}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor='right'
        open={isOpen}
        onClose={handleClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 280,
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          },
        }}
      >
        <Stack sx={{ height: '100%' }}>
          <Stack
            direction='row'
            justifyContent='space-between'
            alignItems='center'
            sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.1)' }}
          >
            <Typography variant='h6' fontWeight={600}>
              工具分类
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack sx={{ flex: 1, overflow: 'auto' }}>
            {allTags.map((item) => (
              <Link
                key={item.name}
                shallow
                scroll={false}
                onClick={() => {
                  setCheckAnchor(item.name);
                  setLinkAnchor(true);
                  setScrollTop(undefined);
                  handleClose();
                }}
                href={'/home/#' + item.name}
                style={{ alignSelf: 'stretch' }}
                className='custom-link'
                prefetch
              >
                <Button
                  sx={{
                    pl: 3,
                    height: '56px',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    borderRadius: 0,
                    backgroundColor:
                      checkAnchor === item.name
                        ? 'rgba(52,90,255,0.08)'
                        : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(52,90,255,0.04)',
                    },
                  }}
                >
                  <Image
                    alt={item.label}
                    src={
                      checkAnchor === item.name ? item.icon_check : item.icon
                    }
                  />
                  <Typography
                    variant='subtitle2'
                    fontFamily='PingFangSC'
                    sx={{
                      color: grayText,
                      fontWeight: checkAnchor === item.name ? 600 : 400,
                      ml: 1.5,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Button>
              </Link>
            ))}
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};

export default MobileNavigation;
