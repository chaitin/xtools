import MainContent from '@/components/MainContent';
import { Box, Button, Stack } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import PixelImg from '../asset/img/pixel-img.jpeg';
import { rgbConvert } from '@/utils/color';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import alertActions from '@/components/Alert';

const _C = () => {
  const [colors, setColors] = useState<any>({
    x: '0',
    y: '0',
    rgb: 'rgb(81, 103, 114)',
    ...rgbConvert(81, 103, 114),
  });
  const [curColor, setCurColor] = useState<any>({
    x: '0',
    y: '0',
    rgb: 'rgb(81, 103, 114)',
    ...rgbConvert(81, 103, 114),
  });

  const onCopy = useCallback(() => {
    alertActions.success('复制成功');
  }, []);

  const handleMousemove = () => {
    const canvas = document.getElementById('pixelCanvas') as HTMLCanvasElement;
    const left = canvas.offsetLeft;
    const top = canvas.offsetTop;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    canvas.onmousemove = (e: any) => {
      const x =
        e.layerX - left < 0
          ? 0
          : e.layerX - left > canvas.width
            ? canvas.width
            : e.layerX - left;
      const y =
        e.layerY - top < 0
          ? 0
          : e.layerY - top > canvas.height
            ? canvas.height
            : e.layerY - top;
      const data = ctx?.getImageData(x, y, 1, 1);
      if (data) {
        setColors({
          x: x,
          y: y,
          ...rgbConvert(data.data[0], data.data[1], data.data[2]),
        });
      }
    };

    canvas.onmousedown = (e: any) => {
      const x =
        e.layerX - left < 0
          ? 0
          : e.layerX - left > canvas.width
            ? canvas.width
            : e.layerX - left;
      const y =
        e.layerY - top < 0
          ? 0
          : e.layerY - top > canvas.height
            ? canvas.height
            : e.layerY - top;
      const data = ctx?.getImageData(x, y, 1, 1);
      if (data) {
        setCurColor({
          x: x,
          y: y,
          ...rgbConvert(data.data[0], data.data[1], data.data[2]),
        });
      }
    };
  };

  const draw = (file: File) => {
    const canvas = document.getElementById('pixelCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target) {
        const url = e.target.result as string;
        image.src = url;
        image.onload = () => {
          const { width, height } = image;
          const aspectRatio = width / height;
          const overWidth = width > 450;
          const overHeight = height > 450;
          if (overWidth && overHeight) {
            if (aspectRatio > 1) {
              canvas.width = 450;
              canvas.height = 450 / aspectRatio;
            } else {
              canvas.width = 450 * aspectRatio;
              canvas.height = 450;
            }
          } else if (overWidth) {
            canvas.width = 450;
            canvas.height = 450 / aspectRatio;
          } else if (overHeight) {
            canvas.width = 450 * aspectRatio;
            canvas.height = 450;
          } else {
            canvas.width = width;
            canvas.height = height;
          }
          ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);
        };

        handleMousemove();
      }
    };

    reader.readAsDataURL(file);
  };

  const handleUpload = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) draw(file);
  };

  useEffect(() => {
    fetch(PixelImg.src)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], 'pixel.jpeg', { type: 'image/jpeg' });
        draw(file);
      });
    const resize = () => handleMousemove();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContent>
      <Box>
        <Button
          sx={{ borderRadius: '4px', mb: 2 }}
          size='small'
          variant='outlined'
          onClick={handleUpload}
        >
          上传图片
        </Button>
        <Box
          component={'input'}
          id='fileInput'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <Stack direction={'row'} alignItems={'flex-start'} spacing={2}>
          <canvas id='pixelCanvas'></canvas>
          <Stack spacing={4} sx={{ fontSize: '14px' }}>
            <Stack direction={'row'} spacing={2}>
              <Box
                sx={{
                  width: '100px',
                  backgroundColor: `${curColor.rgb}`,
                  border: '1px solid rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                }}
              ></Box>
              <Stack direction={'column'} sx={{ py: 1 }}>
                <Box sx={{ mb: 1 }}>选中位置</Box>
                <Box>x : {curColor.x}</Box>
                <Box>y : {curColor.y}</Box>
                <Stack
                  direction='row'
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: 'primary.main' },
                  }}
                >
                  hex:{' '}
                  <CopyToClipboard text={curColor.hex} onCopy={onCopy}>
                    <Box sx={{ ml: '8px' }}>{curColor.hex}</Box>
                  </CopyToClipboard>
                </Stack>
                <Stack
                  direction='row'
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: 'primary.main' },
                  }}
                >
                  rgb:{' '}
                  <CopyToClipboard text={curColor.rgb} onCopy={onCopy}>
                    <Box sx={{ ml: '8px' }}>{curColor.rgb}</Box>
                  </CopyToClipboard>
                </Stack>
                <Stack
                  direction='row'
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: 'primary.main' },
                  }}
                >
                  hsl:{' '}
                  <CopyToClipboard text={curColor.hsl} onCopy={onCopy}>
                    <Box sx={{ ml: '8px' }}>{curColor.hsl}</Box>
                  </CopyToClipboard>
                </Stack>
                <Stack
                  direction='row'
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: 'primary.main' },
                  }}
                >
                  hwb:{' '}
                  <CopyToClipboard text={curColor.hwb} onCopy={onCopy}>
                    <Box sx={{ ml: '8px' }}>{curColor.hwb}</Box>
                  </CopyToClipboard>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction={'row'} spacing={2}>
              <Box
                sx={{
                  width: '100px',
                  backgroundColor: `${colors.rgb}`,
                  border: '1px solid rgba(0,0,0,0.2)',
                  borderRadius: '4px',
                }}
              ></Box>
              <Stack direction={'column'} sx={{ py: 1 }}>
                <Box sx={{ mb: 1 }}>鼠标位置</Box>
                <Box>x: {colors.x}</Box>
                <Box>y: {colors.y}</Box>
                <Stack
                  direction='row'
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: 'primary.main' },
                  }}
                >
                  hex:{' '}
                  <CopyToClipboard text={colors.hex} onCopy={onCopy}>
                    <Box sx={{ ml: '8px' }}>{colors.hex}</Box>
                  </CopyToClipboard>
                </Stack>
                <Stack
                  direction='row'
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: 'primary.main' },
                  }}
                >
                  rgb:{' '}
                  <CopyToClipboard text={colors.rgb} onCopy={onCopy}>
                    <Box sx={{ ml: '8px' }}>{colors.rgb}</Box>
                  </CopyToClipboard>
                </Stack>
                <Stack
                  direction='row'
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: 'primary.main' },
                  }}
                >
                  hsl:{' '}
                  <CopyToClipboard text={colors.hsl} onCopy={onCopy}>
                    <Box sx={{ ml: '8px' }}>{colors.hsl}</Box>
                  </CopyToClipboard>
                </Stack>
                <Stack
                  direction='row'
                  sx={{
                    cursor: 'pointer',
                    ':hover': { color: 'primary.main' },
                  }}
                >
                  hwb:{' '}
                  <CopyToClipboard text={colors.hwb} onCopy={onCopy}>
                    <Box sx={{ ml: '8px' }}>{colors.hwb}</Box>
                  </CopyToClipboard>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </MainContent>
  );
};

export default _C;
