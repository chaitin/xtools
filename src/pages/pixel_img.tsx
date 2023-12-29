import MainContent from '@/components/MainContent';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useThrottle } from 'ahooks';
import { useEffect, useState } from 'react';
import PixelImg from '../asset/img/pixel-img.jpeg';

const _C = () => {
  const [poly, setPoly] = useState<number>(10);
  const [url, setUrl] = useState<string>('');
  const [fileImg, setFileImg] = useState<File>();
  const [aspect, setAspect] = useState<number>(1);
  const throttledPoly = useThrottle(poly, { wait: 500 });

  const draw = () => {
    const canvas = document.getElementById('pixelCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let canvasData = ctx?.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    ) as ImageData;
    let area: { w: number; h: number } = {
      w: 0,
      h: 0,
    };
    for (let i = 0; i < canvas.height; i += poly) {
      for (let j = 0; j < canvas.width; j += poly) {
        area = {
          w: j + poly > canvas.width ? canvas.width % poly : poly,
          h: i + poly > canvas.height ? canvas.height % poly : poly,
        };
        const idx = (j + i * canvas.width) * 4;
        let aveR = aveColors(idx, area, canvas, canvasData);
        let aveG = aveColors(idx + 1, area, canvas, canvasData);
        let aveB = aveColors(idx + 2, area, canvas, canvasData);
        for (let i = 0; i < area.h; i++) {
          for (let j = 0; j < area.w; j++) {
            canvasData.data[idx + j * 4 + canvas.width * i * 4] = aveR;
            canvasData.data[idx + 1 + j * 4 + canvas.width * i * 4] = aveG;
            canvasData.data[idx + 2 + j * 4 + canvas.width * i * 4] = aveB;
          }
        }
      }
    }
    ctx?.putImageData(canvasData, 0, 0);
  };

  const convertToPixelArt = async (file: File) => {
    const canvas = document.getElementById('pixelCanvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    const image = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target) {
        const url = e.target.result as string;
        image.src = url;
        setUrl(url);
        image.onload = () => {
          const { width, height } = image;
          const aspectRatio = width / height;
          setAspect(aspectRatio);
          canvas.width = width > 434 ? 434 : width;
          canvas.height = width > 434 ? 434 / aspectRatio : height;
          ctx?.drawImage(image, 0, 0, canvas.width, canvas.height);

          draw();
        };
      }
    };

    reader.readAsDataURL(file);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const aveColors = (
    idx: number,
    area: { w: number; h: number },
    canvas: HTMLCanvasElement,
    canvasData: ImageData
  ) => {
    let total = 0;
    for (let i = 0; i < area.h; i++) {
      for (let j = 0; j < area.w; j++) {
        if (canvasData.data[idx + j * 4 + canvas.width * i * 4]) {
          total += canvasData.data[idx + j * 4 + canvas.width * i * 4];
        }
      }
    }
    return total / (area.w * area.h);
  };

  const downloadFile = () => {
    const canvas = document.getElementById('pixelCanvas') as HTMLCanvasElement;
    const link = document.createElement('a');
    link.download = `pixel-${poly}.` + fileImg?.name.split('.')[1];
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleUpload = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      convertToPixelArt(file);
      setFileImg(file);
    }
  };

  useEffect(() => {
    if (fileImg && poly > 0) {
      convertToPixelArt(fileImg);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [throttledPoly]);

  useEffect(() => {
    fetch(PixelImg.src)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        setUrl(url);
        const file = new File([blob], 'pixel.jpeg', { type: 'image/jpeg' });
        setFileImg(file);
        convertToPixelArt(file);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MainContent>
      <Box>
        <Stack direction={'row'} justifyContent={'space-between'} spacing={2}>
          <Stack direction='row' alignItems={'center'} spacing={1}>
            <Box sx={{ color: '#999', fontSize: '14px' }}>像素值</Box>
            <TextField
              sx={{
                width: '100px',
                input: {
                  p: '6px 10px',
                },
                'input::placeholder': {
                  fontSize: '14px',
                },
              }}
              type='number'
              size='small'
              variant='outlined'
              value={poly}
              onChange={(e: any) => {
                const v = Number(e.target.value);
                if (v > 30) {
                  setPoly(30);
                } else if (v < 1) {
                  setPoly(1);
                } else {
                  setPoly(v | 0);
                }
              }}
            />
          </Stack>
          <Stack direction='row' alignItems={'center'} spacing={1}>
            <Button
              sx={{ borderRadius: '4px', mb: 2 }}
              size='small'
              variant='outlined'
              onClick={handleUpload}
            >
              上传图片
            </Button>
            <Button
              sx={{ borderRadius: '4px', mb: 2 }}
              size='small'
              variant='contained'
              disabled={!url}
              onClick={downloadFile}
            >
              下载
            </Button>
          </Stack>
        </Stack>
        <Box
          component={'input'}
          id='fileInput'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleChange}
        />
        <Stack direction={'row'} sx={{ mt: 2 }}>
          <Box sx={{ width: '434px' }}>
            {!!url && (
              <Box
                width={434}
                height={(434 / aspect) | 0}
                component={'img'}
                src={url}
              ></Box>
            )}
          </Box>
          <Box width={434} height={(434 / aspect) | 0}>
            <canvas id='pixelCanvas'></canvas>
          </Box>
        </Stack>
      </Box>
    </MainContent>
  );
};

export default _C;
