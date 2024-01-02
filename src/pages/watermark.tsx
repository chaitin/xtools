import MainContent from '@/components/MainContent';
import WatermarkComponent from '@/components/Watermark';
import { Box, Button, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import ImageDownload from '@/components/ImageDownload';

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

const Watermark: React.FC = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      context: '水印文字',
      color: 'rgba(0,0,0,.15)',
      fontSize: 16,
      gap: [100, 100],
      offset: [0, 0],
    },
  });
  const [imageIn, setImageIn] = useState<string>('');
  const [markImage, setMarkImage] = useState<string>('');
  const [mergeImage, setMergeImage] = useState<string>('');
  const watchAllFields = watch();

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files || [];
    if (files.length == 0) {
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      if (e.target == null) {
        return;
      }
      setImageIn(e.target.result as string);
      onMergeImage(e.target.result as string, markImage);
    };
    reader.readAsDataURL(files[0]);
  };

  const onWaterMarkChange = (mark: string) => {
    onMergeImage(imageIn, mark);
    setMarkImage(mark);
  };

  const onMergeImage = (image1Url: string, image2Url: string) => {
    if (image1Url === '' || image2Url === '') return;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const image1 = new Image();
    image1.onload = function () {
      // 加载第二张图片
      const image2 = new Image();
      image2.onload = function () {
        // 设置 canvas 的宽度和高度为两张图片的最大宽度和高度
        canvas.width = image1.width;
        canvas.height = image1.height;

        // 将第一张图片绘制到 canvas 上
        ctx.drawImage(image1, 0, 0);

        // 将第二张图片绘制到 canvas 上
        const pattern = ctx.createPattern(image2, 'repeat')!;
        ctx.fillStyle = pattern;
        ctx.fillRect(
          watchAllFields.offset[0],
          watchAllFields.offset[1],
          canvas.width,
          canvas.height
        );

        // 获取合并后的图片数据
        const mergedImage = canvas.toDataURL('image/jpeg');
        setMergeImage(mergedImage);
      };

      // 设置第二张图片的 URL
      image2.src = image2Url;
    };

    // 设置第一张图片的 URL
    image1.src = image1Url;
  };

  useEffect(() => {
    onMergeImage(imageIn, markImage);
  }, [watchAllFields.offset[0], watchAllFields.offset[1]]);

  return (
    <MainContent>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Stack spacing={3} sx={{ color: '#FF1844' }}>
          <Button component='label' variant='outlined'>
            选择图片
            <VisuallyHiddenInput type='file' onChange={handleSelectFile} />
          </Button>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', columnGap: 3 }}>
            <Box sx={{ fontSize: '14px', color: 'text.secondary', mb: 2 }}>
              水印文字
              <Box
                sx={{
                  mt: 0.5,
                }}
              >
                <Controller
                  name='context'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      {...field}
                      variant='outlined'
                      error={Boolean(errors.context)}
                      helperText={errors.context?.message as string}
                      size='small'
                      autoComplete='off'
                    />
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ fontSize: '14px', color: 'text.secondary', mb: 2 }}>
              水印颜色
              <Box
                sx={{
                  mt: 0.5,
                }}
              >
                <Controller
                  name='color'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      {...field}
                      variant='outlined'
                      size='small'
                      autoComplete='off'
                    />
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ fontSize: '14px', color: 'text.secondary', mb: 2 }}>
              字体大小
              <Box
                sx={{
                  mt: 0.5,
                }}
              >
                <Controller
                  name='fontSize'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      {...field}
                      variant='outlined'
                      size='small'
                      autoComplete='off'
                    />
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ fontSize: '14px', color: 'text.secondary', mb: 2 }}>
              水印横间隔
              <Box
                sx={{
                  mt: 0.5,
                }}
              >
                <Controller
                  name='gap.0'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      {...field}
                      variant='outlined'
                      size='small'
                      autoComplete='off'
                    />
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ fontSize: '14px', color: 'text.secondary', mb: 2 }}>
              水印纵间隔
              <Box
                sx={{
                  mt: 0.5,
                }}
              >
                <Controller
                  name='gap.1'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      {...field}
                      variant='outlined'
                      error={Boolean(errors.context)}
                      helperText={errors.context?.message as string}
                      size='small'
                      autoComplete='off'
                    />
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ fontSize: '14px', color: 'text.secondary', mb: 2 }}>
              横向偏移量
              <Box
                sx={{
                  mt: 0.5,
                }}
              >
                <Controller
                  name='offset.0'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      {...field}
                      variant='outlined'
                      size='small'
                      autoComplete='off'
                    />
                  )}
                />
              </Box>
            </Box>
            <Box sx={{ fontSize: '14px', color: 'text.secondary', mb: 2 }}>
              纵向偏移量
              <Box
                sx={{
                  mt: 0.5,
                }}
              >
                <Controller
                  name='offset.1'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      required
                      {...field}
                      variant='outlined'
                      error={Boolean(errors.context)}
                      helperText={errors.context?.message as string}
                      size='small'
                      autoComplete='off'
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        </Stack>
        {imageIn && (
          <Box>
            <ImageDownload src={mergeImage} />
            <WatermarkComponent
              content={watchAllFields.context}
              font={{
                color: watchAllFields.color,
                fontSize: watchAllFields.fontSize || 16,
              }}
              gap={watchAllFields.gap as [number, number]}
              onWaterMarkChange={onWaterMarkChange}
            ></WatermarkComponent>
          </Box>
        )}
      </Box>
    </MainContent>
  );
};

export default Watermark;
