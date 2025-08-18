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
  TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { saveAs } from 'file-saver';
import alert from '@/components/Alert';
import { ToolsForm } from '@/components/Tools';

const UploadImg = styled('img')({
  maxHeight: '100%',
  maxWidth: '100%',
});

const MAX_IMAGES = 10;

type ImgInfo = {
  url: string;
  image: HTMLImageElement;
};

type Direction = 'horizontal' | 'vertical';

type Align = 'start' | 'center' | 'end';

const ImgJoints = () => {
  const [imgList, setImgList] = useState<ImgInfo[]>([]);
  const [direction, setDirection] = useState<Direction>('horizontal');
  const [resultUrl, setResultUrl] = useState<string>('');
  // 对齐方式动态切换
  const [align, setAlign] = useState<Align>('center');
  // 目标宽高（可选）
  const [targetWidth, setTargetWidth] = useState<string>('');
  const [targetHeight, setTargetHeight] = useState<string>('');
  // 初始缩放比例（百分比）
  const [scale, setScale] = useState<number>(100);
  // 下载格式与质量
  const [format, setFormat] = useState<'png' | 'jpg'>('png');
  const [jpegQuality, setJpegQuality] = useState<number>(92);
  // 保存画布用于按所选格式导出
  const resultCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleUpload = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, MAX_IMAGES);
    if (files.length === 0) return;
    // 保持文件顺序
    const temp: Array<ImgInfo | undefined> = new Array(files.length);
    let loaded = 0;
    files.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const url = ev.target?.result as string;
        const img = new window.Image();
        img.src = url;
        img.onload = () => {
          temp[idx] = { url, image: img };
          loaded++;
          if (loaded === files.length) {
            setImgList(temp.filter(Boolean) as ImgInfo[]);
          }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const getAlignOptions = () => {
    return direction === 'horizontal'
      ? [
          { value: 'start', label: '顶部对齐' },
          { value: 'center', label: '居中对齐' },
          { value: 'end', label: '底部对齐' },
        ]
      : [
          { value: 'start', label: '左侧对齐' },
          { value: 'center', label: '居中对齐' },
          { value: 'end', label: '右侧对齐' },
        ];
  };

  const handleJoint = () => {
    if (imgList.length < 2) {
      alert.warning('请至少上传两张图片');
      return;
    }
    // 解析目标宽高
    const tw = targetWidth ? parseInt(targetWidth, 10) : undefined;
    const th = targetHeight ? parseInt(targetHeight, 10) : undefined;
    if (tw !== undefined && (isNaN(tw) || tw < 10)) {
      alert.warning('请输入有效的目标宽度（>=10）');
      return;
    }
    if (th !== undefined && (isNaN(th) || th < 10)) {
      alert.warning('请输入有效的目标高度（>=10）');
      return;
    }

    // 初始缩放比例（百分比缩放）
    const ratio = Math.max(1, isNaN(scale) ? 100 : scale) / 100;

    // 计算所有图片按比例缩放后的基础宽高（使用浮点数，避免过早 round 导致累计误差）
    const baseImgs = imgList.map(({ image }) => ({
      baseW: image.width * ratio,
      baseH: image.height * ratio,
      image,
    }));

    let totalWidth = 0;
    let totalHeight = 0;
    let maxWidth = 0;
    let maxHeight = 0;
    baseImgs.forEach(({ baseW, baseH }) => {
      totalWidth += baseW;
      totalHeight += baseH;
      if (baseW > maxWidth) maxWidth = baseW;
      if (baseH > maxHeight) maxHeight = baseH;
    });

    // 计算最终画布尺寸（主轴严格填充目标尺寸，交叉轴可留白）
    let canvasWidth: number;
    let canvasHeight: number;
    if (direction === 'horizontal') {
      canvasWidth = tw ?? Math.round(totalWidth);
      const mainScale = canvasWidth / Math.max(1, totalWidth);
      const contentHeight = Math.max(1, Math.round(maxHeight * mainScale));
      canvasHeight = th ?? contentHeight;
    } else {
      canvasHeight = th ?? Math.round(totalHeight);
      const mainScale = canvasHeight / Math.max(1, totalHeight);
      const contentWidth = Math.max(1, Math.round(maxWidth * mainScale));
      canvasWidth = tw ?? contentWidth;
    }

    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(canvasWidth));
    canvas.height = Math.max(1, Math.round(canvasHeight));
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      alert.error?.('浏览器不支持 2D 画布');
      return;
    }

    let offsetX = 0;
    let offsetY = 0;
    // 根据主轴计算统一缩放因子，填满主轴长度（使用浮点绘制，避免强行拉伸）
    if (direction === 'horizontal') {
      const mainScale = canvas.width / Math.max(1, totalWidth);
      baseImgs.forEach(({ image, baseW, baseH }) => {
        const drawW = baseW * mainScale;
        const drawH = baseH * mainScale;
        let y = 0;
        if (align === 'center') y = (canvas.height - drawH) / 2;
        else if (align === 'end') y = canvas.height - drawH;
        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          offsetX,
          y,
          drawW,
          drawH
        );
        offsetX += drawW;
      });
    } else {
      const mainScale = canvas.height / Math.max(1, totalHeight);
      baseImgs.forEach(({ image, baseW, baseH }) => {
        const drawW = baseW * mainScale;
        const drawH = baseH * mainScale;
        let x = 0;
        if (align === 'center') x = (canvas.width - drawW) / 2;
        else if (align === 'end') x = canvas.width - drawW;
        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          x,
          offsetY,
          drawW,
          drawH
        );
        offsetY += drawH;
      });
    }

    // 保存画布与预览
    resultCanvasRef.current = canvas;
    const url = canvas.toDataURL('image/png');
    setResultUrl(url);
  };

  const handleDownload = () => {
    if (!resultCanvasRef.current) return;
    const canvas = resultCanvasRef.current;
    if (format === 'png') {
      const data = canvas.toDataURL('image/png');
      saveAs(data, '拼接图片.png');
    } else {
      const q = Math.min(100, Math.max(1, Math.round(jpegQuality))) / 100;
      const data = canvas.toDataURL('image/jpeg', q);
      saveAs(data, '拼接图片.jpg');
    }
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
            {imgList.length === 0 && (
              <Typography component='span'>点击选择图片（最多10张）</Typography>
            )}
            {imgList.length > 0 && (
              <Stack
                direction='row'
                spacing={1}
                sx={{ overflow: 'auto', maxWidth: '100%' }}
              >
                {imgList.map((img, idx) => (
                  <UploadImg
                    key={idx}
                    src={img.url}
                    style={{ maxWidth: 60, maxHeight: 60 }}
                  />
                ))}
              </Stack>
            )}
          </Button>
          <Box my={2}>
            {/* 第一行：拼接方向 + 对齐方式 */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
              spacing={2}
              mb={1}
            >
              <FormControl variant='outlined'>
                <FormLabel>拼接方向：</FormLabel>
                <RadioGroup
                  row
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as Direction)}
                >
                  <FormControlLabel
                    value='horizontal'
                    control={<Radio />}
                    label='水平'
                  />
                  <FormControlLabel
                    value='vertical'
                    control={<Radio />}
                    label='垂直'
                  />
                </RadioGroup>
              </FormControl>
              <FormControl variant='outlined'>
                <FormLabel>对齐方式：</FormLabel>
                <RadioGroup
                  row
                  value={align}
                  onChange={(e) => setAlign(e.target.value as Align)}
                >
                  {getAlignOptions().map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={<Radio />}
                      label={opt.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Stack>
            {/* 第二行：目标宽高 + 缩放比例 */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
              spacing={2}
              mb={1}
            >
              <Stack
                direction='row'
                spacing={1}
                alignItems='center'
                flexWrap={'wrap'}
              >
                <TextField
                  variant='outlined'
                  size='small'
                  type='number'
                  label='目标宽度(px)'
                  value={targetWidth}
                  onChange={(e) =>
                    setTargetWidth(e.target.value.replace(/\D/g, ''))
                  }
                  sx={{ width: 140 }}
                  placeholder='自动'
                  InputProps={{ inputProps: { min: 10 } }}
                />
                <TextField
                  variant='outlined'
                  size='small'
                  type='number'
                  label='目标高度(px)'
                  value={targetHeight}
                  onChange={(e) =>
                    setTargetHeight(e.target.value.replace(/\D/g, ''))
                  }
                  sx={{ width: 140 }}
                  placeholder='自动'
                  InputProps={{ inputProps: { min: 10 } }}
                />
                <TextField
                  variant='outlined'
                  size='small'
                  type='number'
                  label='缩放比例'
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  sx={{ width: 120 }}
                  InputProps={{
                    endAdornment: <Typography variant='body2'>%</Typography>,
                  }}
                />
              </Stack>
            </Stack>
            {/* 第三行：下载格式 + JPEG质量 + 按钮 */}
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              alignItems={{ xs: 'flex-start', md: 'center' }}
              spacing={2}
            >
              <FormControl variant='outlined'>
                <FormLabel>下载格式：</FormLabel>
                <RadioGroup
                  row
                  value={format}
                  onChange={(e) => setFormat(e.target.value as 'png' | 'jpg')}
                >
                  <FormControlLabel
                    value='png'
                    control={<Radio />}
                    label='PNG'
                  />
                  <FormControlLabel
                    value='jpg'
                    control={<Radio />}
                    label='JPG'
                  />
                </RadioGroup>
              </FormControl>
              {format === 'jpg' && (
                <TextField
                  variant='outlined'
                  size='small'
                  type='number'
                  label='JPEG 质量(1-100)'
                  value={jpegQuality}
                  onChange={(e) => setJpegQuality(Number(e.target.value))}
                  sx={{ width: 160 }}
                  InputProps={{ inputProps: { min: 1, max: 100 } }}
                />
              )}
              <Box>
                <Button
                  size='small'
                  sx={{ borderRadius: '4px', minWidth: 120 }}
                  variant='contained'
                  color='primary'
                  onClick={handleJoint}
                  disabled={imgList.length < 2}
                >
                  生成拼接
                </Button>
                <Button
                  size='small'
                  sx={{ borderRadius: '4px', ml: 1, minWidth: 120 }}
                  variant='outlined'
                  disabled={!resultUrl}
                  onClick={handleDownload}
                >
                  下载图片
                </Button>
              </Box>
            </Stack>
          </Box>
          {!!resultUrl && (
            <>
              <Typography variant='subtitle2' mb={1}>
                预览：
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  border: '1px solid #eee',
                  background: '#fafafa',
                  padding: '10px',
                  maxWidth: '100%',
                  position: 'relative',
                  height: 'clamp(200px, 60vh, 500px)',
                }}
              >
                <Image
                  src={resultUrl}
                  alt='拼接结果'
                  fill
                  sizes='100vw'
                  style={{ objectFit: 'contain', borderRadius: 4 }}
                  unoptimized
                />
              </Box>
            </>
          )}
          <Box
            component={'input'}
            id='fileInput'
            type='file'
            accept='image/*'
            style={{ display: 'none' }}
            multiple
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
              - 支持最多 10 张图片拼接，水平或垂直拼接；
              <br />- 支持自定义拼接后图片的宽度和高度（留空为自动）；
              <br />- 支持缩放比例（对所有图片进行统一缩放后再拼接）；
              <br />-
              对齐方式随方向动态切换（水平：顶部/居中/底部；垂直：左/居中/右）；
              <br />- 可选择 PNG/JPG
              下载格式；仅在浏览器本地处理，不会上传到服务器。
            </Box>
          </Box>
        </Box>
      </ToolsForm>
    </MainContent>
  );
};

export default ImgJoints;
