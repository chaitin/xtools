import { grayText } from '@/constant';
import { usePath } from '@/hooks';
import { allTags } from '@/utils/tags';
import { Tool, allTools } from '@/utils/tools';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { Box, Button, Stack, SxProps, Theme, Typography } from '@mui/material';
import React, { useEffect } from 'react';

const MainContent: React.FC<{
  children: React.ReactElement;
  sx?: SxProps<Theme>;
  fullScreen?: boolean;
}> = ({ children, sx, fullScreen = false }) => {
  const { path } = usePath();

  const [tool] = React.useState<Tool | undefined>(
    allTools.find((item) => item.path === path)
  );
  const handleFullScreen = () => {
    const fullscreenElement = document.body as any;
    new Promise((r) => {
      if (fullscreenElement?.requestFullscreen) {
        r(fullscreenElement.requestFullscreen());
      } else if (fullscreenElement?.mozRequestFullScreen) {
        // 兼容 Firefox
        r(fullscreenElement?.mozRequestFullScreen());
      } else if (fullscreenElement?.webkitRequestFullscreen) {
        // 兼容 Chrome, Safari 和 Opera
        r(fullscreenElement?.webkitRequestFullscreen());
      } else if (fullscreenElement?.msRequestFullscreen) {
        // 兼容 IE/Edge
        r(fullscreenElement?.msRequestFullscreen());
      }
    }).then(() => {
      const dom = document.getElementById('fullscreen-element');
      if (dom) {
        dom.style.position = 'fixed';
        dom.style.inset = '0';
        dom.style.maxWidth = '100vw';
      }
    });
  };
  useEffect(() => {
    // 检查是否处于全屏状态
    function isFullscreen() {
      return (
        document.fullscreenElement ||
        (document as any).mozFullScreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      );
    }
    const handleFullscreenChange = (e: Event) => {
      if (!isFullscreen()) {
        const dom = document.getElementById('fullscreen-element');
        if (dom) {
          dom.style.position = 'unset';
          dom.style.inset = '0';
          dom.style.maxWidth = 'unset';
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange
      );
    };
  }, []);
  return (
    <Stack
      sx={{
        px: '50px',
        py: 2,
        overflow: 'auto',
        flex: 1,
        borderRadius: '8px',
        boxShadow:
          '0px 0px 2px 0px rgba(145,158,171,0.2), 0px 12px 24px -4px rgba(145,158,171,0.12)',
        ...sx,
      }}
    >
      <Stack direction='row' justifyContent='space-between'>
        <Box>
          <Typography
            sx={{
              mb: '0px',
              fontWeight: 600,
              color: grayText,
              fontSize: '20px',
            }}
            gutterBottom
            variant='subtitle1'
            component='div'
          >
            {tool?.label}
          </Typography>
        </Box>
        <Stack direction='row' sx={{ fontFamily: 'Mono' }}>
          {allTags
            .filter((tag) => tool?.tags.includes(tag.name))
            .map((tag) => (
              <Box
                key={tag.name}
                sx={{
                  height: '24px',
                  lineHeight: '24px',
                  fontSize: '12px',
                  background: 'rgba(52,90,255,0.1)',
                  color: '#345AFF',
                  px: 1,
                  borderRadius: 1,
                  ml: 1,
                }}
              >
                {tag.label}
              </Box>
            ))}
        </Stack>
      </Stack>
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{
          position: 'relative',
          width: '100%',
          alignSelf: 'stretch',
          mb: '24px',
        }}
      >
        <Typography
          variant='caption'
          sx={{
            display: 'inline-block',
            maxWidth: '100%',
            pl: '6px',
            color: 'rgba(11,37,98,0.5)',
            background: 'rgba(11,37,98,0.04)',
            borderRadius: 1,
            lineHeight: '24px',
          }}
        >
          {tool?.subTitle}
        </Typography>
        {fullScreen ? (
          <Button
            size='small'
            onClick={handleFullScreen}
            sx={{
              borderRadius: '4px',
              height: '24px',
            }}
            variant='outlined'
            startIcon={<FullscreenIcon />}
          >
            全屏
          </Button>
        ) : null}
      </Stack>
      <Stack
        id='fullscreen-element'
        sx={{
          gap: '18px',
          maxWidth: '1020px',
          fontFamily: 'Mono',
          mx: 'auto',
          flex: 1,
          width: '100%',
        }}
      >
        {children}
      </Stack>
    </Stack>
  );
};

export default MainContent;
