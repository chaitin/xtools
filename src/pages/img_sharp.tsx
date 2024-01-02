import MainContent from '@/components/MainContent';
import { Slider, Box, Button, Stack, Tab, Grid } from '@mui/material';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';
import { shrinkImage } from 'shrinkpng';
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

const UploadImg = styled('img')({
  maxHeight: '100%',
  maxWidth: '100%',
});

function formatFileSize(size: number): string {
  if (size === 0) {
    return '0 B';
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const digitGroups = Math.floor(Math.log10(size) / Math.log10(1024));

  return `${(size / Math.pow(1024, digitGroups)).toFixed(2)} ${
    units[digitGroups]
  }`;
}

const MySpan = styled('span')({});

const ImgSharp: React.FC = () => {
  const [In, setIn] = useState<string>('');
  const [out, setOut] = useState<string>('');

  const [sharpSize, setSharpSize] = useState<string>('');
  const [rawSize, setRawSize] = useState<string>('');

  const [quality, setQuality] = useState(60);

  const [f, setFile] = useState<File>();
  const [outF, setOutFile] = useState<File>();

  var filename = '';

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      const f = files[0];
      filename = f.name;
      setRawSize(formatFileSize(f.size));
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target !== null) {
          setIn(e.target.result as string);
        }
      };
      reader.readAsDataURL(f);
      setFile(f);
      doSharp(quality, f);
    },
    [f, quality]
  );

  const handleQualityChanged = useCallback(
    (event: Event, newValue: number | number[]) => {
      setQuality(newValue as number);
      doSharp(quality, f as File);
    },
    [f, quality]
  );

  async function doSharp(q: number, file: File) {
    const _file = await shrinkImage(file, { quality: q });
    const reader = new FileReader();
    reader.onload = function (e) {
      if (e.target !== null) {
        setOut(e.target.result as string);
      }
    };
    reader.readAsDataURL(_file);
    setSharpSize(formatFileSize(_file.size));
    setOutFile(_file as File);
  }

  return (
    <MainContent>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value='1'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList>
              <Tab
                label='图片压缩'
                value='1'
                sx={{ textTransform: 'none !important' }}
              />
            </TabList>
          </Box>
          <TabPanel value='1' sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Stack spacing={1}>
              <Button
                component='label'
                variant='outlined'
                sx={{ borderRadius: '3px', height: '179px' }}
              >
                {In ? <MySpan></MySpan> : <MySpan>选择图片</MySpan>}
                <UploadImg src={In} />
                <VisuallyHiddenInput
                  type='file'
                  accept='image/*'
                  onChange={handleSelectFile}
                />
              </Button>
              <Grid
                container
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '14px',
                }}
              >
                <Grid item xs={1}>
                  <Box sx={{ fontSize: '14px' }}>图片质量</Box>
                </Grid>
                <Grid item xs={11}>
                  <Slider
                    size='small'
                    defaultValue={60}
                    onChange={handleQualityChanged}
                    aria-label='Small'
                    valueLabelDisplay='auto'
                  />
                </Grid>
                <Grid item xs={6}>
                  原大小: {rawSize}
                </Grid>
                <Grid item xs={6}>
                  压缩后大小: {sharpSize}
                </Grid>
              </Grid>
              {out ? <ImageDownload src={out} /> : <></>}
            </Stack>
          </TabPanel>
        </TabContext>
      </Box>
    </MainContent>
  );
};

export default ImgSharp;
