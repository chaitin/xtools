import MenuView from '@/components/MenuView';
import { Box, Button, Stack } from '@mui/material';

import { styled } from '@mui/material/styles';
import React, { useCallback, useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const UploadImg = styled('img')({
  maxHeight: '100%',
  maxWidth: '100%',
});

const OutImg = styled('img')({
  Width: '100%',
  border: 'black solid 1px',
  borderColor: 'rgba(0, 0, 0, 0.1)',
  margin: '20px',
  padding: '20px',
  borderRadius: '3px',
});

const MySpan = styled('span')({});

const ImgBase64: React.FC = () => {
  const [imageIn, setimageIn] = useState<string>('');
  const [uncolorOut, setuncolorOut] = useState<string>('');

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target == null) {
          return;
        }
        setimageIn(e.target.result as string);
        // 获取加载的图像数据
        const imgData = e.target.result;
        if (typeof imgData !== 'string') {
          return;
        }
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (ctx == null) {
            return;
          }
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0, img.width, img.height);
          // 将图像转换为黑白
          const imgArrData = ctx.getImageData(0, 0, img.width, img.height);
          for (let i = 0; i < imgArrData.data.length; i += 4) {
            let r = imgArrData.data[i],
              g = imgArrData.data[i + 1],
              b = imgArrData.data[i + 2];
            const avg = (r + g + b) / 3;
            imgArrData.data[i] =
              imgArrData.data[i + 1] =
              imgArrData.data[i + 2] =
                avg;
          }
          console.log(imgArrData);
          ctx.putImageData(imgArrData, 0, 0);
          const blackAndWhiteDataURL = canvas.toDataURL();
          console.log('Black and white image:', blackAndWhiteDataURL);
          setuncolorOut(blackAndWhiteDataURL);
        };
        img.src = imgData;
      };
      reader.readAsDataURL(files[0]);
    },
    []
  );

  return (
    <MenuView>
      <Stack
        sx={{
          mt: '24px',
          gap: '18px',
          maxWidth: '1020px',
          fontFamily: 'Mono',
          
          mx: 'auto',
        }}
      >
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Stack spacing={1} sx={{ color: '#FF1844' }}>
            <Button
              component='label'
              variant='outlined'
              sx={{ borderRadius: '3px', height: '179px' }}
            >
              {imageIn ? <MySpan></MySpan> : <MySpan>选择图片</MySpan>}
              <UploadImg src={imageIn} />
              <VisuallyHiddenInput type='file' onChange={handleSelectFile} />
            </Button>
            <OutImg src={uncolorOut} />
          </Stack>
        </Box>
      </Stack>
    </MenuView>
  );
};

export default ImgBase64;
