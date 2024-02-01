import MainContent from '@/components/MainContent';
import {
  Box,
  Button,
  Stack,
  Typography,
  FormLabel,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  OutlinedInput,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { ToolsForm } from '@/components/Tools';
import alert from '@/components/Alert';

type SplitResult = {
  canvas: HTMLCanvasElement[];
  row: number;
  col: number;
  width: number;
};

const UploadImg = styled('img')({
  maxHeight: '100%',
  maxWidth: '100%',
});

const formatNumber = (value: number) => {
  if (typeof value === 'number' && !isNaN(value)) {
    return Math.min(Math.max(Math.round(value), 1), 10);
  }
  return value;
};

const ImgSplit = () => {
  const [format, setFormat] = useState<string>('png');
  const [row, setRow] = useState<number>(3);
  const [col, setCol] = useState<number>(3);

  const [imgUrl, setImgUrl] = useState<string>('');
  const [image, setImage] = useState<HTMLImageElement | null>(null);

  const [result, setResult] = useState<SplitResult>({
    canvas: [],
    row: 0,
    col: 0,
    width: 0,
  });

  const handleUpload = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      const image = new Image();

      reader.onload = (e) => {
        if (e.target) {
          const url = e.target.result as string;
          image.src = url;
          setImgUrl(url);
          image.onload = () => {
            setImage(image);
          };
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSplit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!image) {
      alert.warning('请先上传图片');
      return;
    }

    const wpiece = Math.floor(image.width / col);
    const hpiece = Math.floor(image.height / row);
    const results = [];

    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        canvas.width = wpiece;
        canvas.height = hpiece;

        ctx?.drawImage(
          image,
          c * wpiece,
          r * hpiece,
          wpiece,
          hpiece,
          0,
          0,
          wpiece,
          hpiece
        );
        results.push(canvas);
      }
    }
    setResult({
      col,
      row,
      canvas: results,
      width: image.width,
    });
  };

  const downloadImage = (index: number) => {
    const canvas = result.canvas?.[index];
    if (canvas) {
      const dataUrl = canvas.toDataURL(`image/${format}`);
      const extName = /^data:[a-zA-Z0-9]+\/([a-zA-Z0-9]+)[^;]*;base64,/.exec(
        dataUrl
      );
      if (extName && extName[1]) {
        const aTag = document.createElement('a');
        aTag.style.display = 'none';
        aTag.href = dataUrl;
        aTag.download = `${index + 1}.${format}`;
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
      }
    }
  };

  const downloadAllImages = () => {
    const zip = new JSZip();
    result.canvas?.forEach((canvas, index) => {
      const dataUrl = canvas.toDataURL(`image/${format}`);
      const base64 = dataUrl.replace(/^data:image\/(png|jpeg);base64,/, '');
      zip.file(`${String(index + 1)}.${format}`, base64, { base64: true });
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, '切图打包.zip');
    });
  };

  return (
    <MainContent>
      <ToolsForm>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Button
            component='label'
            fullWidth
            variant='outlined'
            sx={{ borderRadius: '3px', height: '179px' }}
            onClick={handleUpload}
          >
            {!imgUrl && <Typography component='span'>点击选择图片</Typography>}
            <UploadImg src={imgUrl} />
          </Button>
          <Box my={1}>
            <form onSubmit={handleSplit}>
              <Stack direction='row' alignItems='center'>
                <Stack direction='row' alignItems='center'>
                  <FormControl variant='outlined'>
                    <Stack direction='row' alignItems='center' mr={1}>
                      <FormLabel>切图行：</FormLabel>
                      <OutlinedInput
                        required
                        size='small'
                        type='number'
                        inputProps={{
                          max: 10,
                          min: 1,
                        }}
                        value={row}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setRow(formatNumber(e.target.valueAsNumber))
                        }
                        sx={{ width: '80px' }}
                      />
                    </Stack>
                  </FormControl>
                  <FormControl variant='outlined'>
                    <Stack direction='row' alignItems='center' mr={4}>
                      <FormLabel>切图列：</FormLabel>
                      <OutlinedInput
                        required
                        type='number'
                        inputProps={{
                          max: 10,
                          min: 1,
                        }}
                        value={col}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setCol(formatNumber(e.target.valueAsNumber))
                        }
                        sx={{ width: '80px' }}
                      />
                    </Stack>
                  </FormControl>
                  <FormControl variant='outlined'>
                    <Stack direction='row'>
                      <FormLabel sx={{ lineHeight: '42px' }}>
                        下载格式：
                      </FormLabel>
                      <RadioGroup
                        row
                        value={format}
                        onChange={(e: any) => setFormat(e.target.value)}
                      >
                        <FormControlLabel
                          value='png'
                          control={<Radio />}
                          label='png'
                        />
                        <FormControlLabel
                          value='jpeg'
                          control={<Radio />}
                          label='jpeg'
                        />
                        <FormControlLabel
                          value='bmp'
                          control={<Radio />}
                          label='bmp'
                        />
                      </RadioGroup>
                    </Stack>
                  </FormControl>
                </Stack>
                <Box ml={8}>
                  <Button
                    size='small'
                    sx={{ borderRadius: '4px' }}
                    variant='contained'
                    color='primary'
                    type='submit'
                    disabled={!image}
                  >
                    生成切图
                  </Button>
                  <Button
                    size='small'
                    sx={{ borderRadius: '4px', ml: 1 }}
                    variant='outlined'
                    disabled={!result.canvas?.length}
                    onClick={downloadAllImages}
                  >
                    批量下载
                  </Button>
                </Box>
              </Stack>
            </form>
          </Box>
          {!!result.canvas?.length && (
            <>
              <Typography variant='subtitle2' mb={1}>
                预览：
              </Typography>
              <Box
                width={result.width || 800}
                sx={{
                  grid: `repeat(${result.row}, 1fr) / repeat(${result.col}, 1fr);`,
                  display: 'grid',
                  gridGap: '1px',
                  maxWidth: '100%',
                }}
              >
                {result.canvas.map((item, index) => (
                  <Box
                    key={index}
                    onClick={() => downloadImage(index)}
                    sx={{
                      cursor: 'pointer',
                      canvas: {
                        display: 'block',
                        maxWidth: '100%',
                      },
                    }}
                  >
                    <canvas
                      id={'img_' + index}
                      width={item.width}
                      height={item.height}
                      ref={(canvas) =>
                        canvas && canvas.getContext('2d')?.drawImage(item, 0, 0)
                      }
                    />
                  </Box>
                ))}
              </Box>
            </>
          )}
          <Box
            component={'input'}
            id='fileInput'
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Box mt={2}>
            <Typography variant='subtitle2' mb={1}>
              工具说明:
            </Typography>
            <Box
              sx={{
                fontSize: '14px',
                color: '#666',
                background: '#f1f2f3',
                padding: '15px',
                borderRadius: '4px',
              }}
            >
              该工具可生成 9 宫图（3 行 * 3 列） 等多格切图，默认 9
              宫格切图，支持最多 10 * 10 = 100 多格切图。
              <br />
              上传图片，点击【生成切图】按钮，即可看到切图后的效果。
              <br />
              支持多图批量打包成一个 .zip
              压缩文件下载，也可以单图单击下载或点击右键保存。
              <br />
              功能由前端实现，不会上传图片到服务器。
            </Box>
          </Box>
        </Box>
      </ToolsForm>
    </MainContent>
  );
};

export default ImgSplit;
