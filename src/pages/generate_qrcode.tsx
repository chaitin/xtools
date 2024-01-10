import CusTabs from '@/components/CusTabs';
import MainContent from '@/components/MainContent';
import { hexToRgb } from '@/utils/color';
import {
  Box,
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material';
import QRCode, { QRCodeErrorCorrectionLevel } from 'qrcode';
import QrcodeParse from 'qrcode-parser';
import { useEffect, useState } from 'react';

const OriginTypes = [
  { label: '文本', value: 'text' },
  { label: '网址', value: 'url' },
];

const LevelErrorResistance = {
  L: '7%',
  M: '15%',
  Q: '25%',
  H: '30%',
  low: '7%',
  medium: '15%',
  quartile: '25%',
  high: '30%',
};

const eclOptions = [
  { label: '7%', value: 'L' },
  { label: '15%', value: 'M' },
  { label: '25%', value: 'Q' },
  { label: '30%', value: 'H' },
];

const mgOptions = [
  { label: '无边距', value: 0 },
  { label: '1 个色块', value: 1 },
  { label: '2 个色块', value: 2 },
  { label: '3 个色块', value: 3 },
  { label: '4 个色块', value: 4 },
];

const _C = () => {
  const [oType, setOType] = useState(OriginTypes[0].value);
  const [error, setError] = useState<string>('');

  const [bgimg, setBgimg] = useState<ImageData>();
  const [bgcolor, setBgcolor] = useState('#ffffff');
  const [fgimg, setFgimg] = useState<ImageData>();
  const [fgcolor, setFgcolor] = useState('#000000');
  const [logo, setLogo] = useState<HTMLImageElement>();
  const [qrcodeData, setQrcodeData] = useState<ImageData>();

  const [text, setText] = useState('');
  const [url, setUrl] = useState('');
  const [count, setCount] = useState(0);

  const [options, setOptions] = useState<QRCode.QRCodeToDataURLOptions>({
    errorCorrectionLevel: 'H',
    margin: 2,
    width: 400,
  });

  const generate = () => {
    if (!error) setCount(count + 1);
    if (!text && !url) deleteCanvas();
  };

  const download = () => {
    const qrcodeCanvas = document.getElementById('qrcode') as HTMLCanvasElement;
    const url = qrcodeCanvas?.toDataURL();

    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const upload = (type: string) => {
    const input = document.getElementById(type);
    input?.click();
  };

  const addGi = (event: any, type: 'bgimg' | 'fgimg' | 'logoimg') => {
    const file = event.target.files[0];
    const img = new Image();
    const canvas = document.createElement('canvas');
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      if (type === 'logoimg') {
        setLogo(img);
        return;
      }
      canvas.width = options.width!;
      canvas.height = options.width!;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0, options.width!, options.width!);
      const data = ctx?.getImageData(0, 0, options.width!, options.width!);
      if (type === 'bgimg') {
        setBgcolor('#ffffff');
        setBgimg(data);
      } else {
        setFgcolor('#000000');
        setFgimg(data);
      }
    };
  };

  const clear = () => {
    setError('');
    setQrcodeData(undefined);
    setLogo(undefined);
    setFgimg(undefined);
    setBgimg(undefined);
    setFgcolor('#000000');
    setBgcolor('#ffffff');
    setOptions({ errorCorrectionLevel: 'H', margin: 2, width: 400 });
  };

  const deleteCanvas = () => {
    clear();
    setTimeout(() => {
      clear();
      setText('');
      setUrl('');
      const qrcodeCanvas = document.getElementById(
        'qrcode'
      ) as HTMLCanvasElement;
      const qrcodeCtx = qrcodeCanvas!.getContext('2d', {
        willReadFrequently: true,
      })!;
      qrcodeCtx.clearRect(0, 0, options.width!, options.width!);
    }, 0);
    // requestAnimationFrame(deleteCanvas)
  };

  useEffect(() => {
    if (qrcodeData) {
      const origin = qrcodeData.data;
      const qrcodeimg = new ImageData(
        new Uint8ClampedArray(origin),
        options.width!,
        options.width!
      );
      const qrcodePixels = qrcodeimg.data;

      const qrcodeCanvas = document.getElementById(
        'qrcode'
      ) as HTMLCanvasElement;
      const qrcodeCtx = qrcodeCanvas!.getContext('2d', {
        willReadFrequently: true,
      })!;

      if (bgcolor) {
        for (let i = 0; i < qrcodePixels.length; i += 4) {
          if (
            i % 4 === 0 &&
            origin[i] === 255 &&
            origin[i + 1] === 255 &&
            origin[i + 2] === 255 &&
            origin[i + 3] === 255
          ) {
            const bgcolors = hexToRgb(bgcolor);
            qrcodePixels[i] = bgcolors[0];
            qrcodePixels[i + 1] = bgcolors[1];
            qrcodePixels[i + 2] = bgcolors[2];
            qrcodePixels[i + 3] = 255;
          }
        }
      }

      if (fgcolor) {
        for (let i = 0; i < qrcodePixels.length; i += 4) {
          if (
            i % 4 === 0 &&
            origin[i] === 0 &&
            origin[i + 1] === 0 &&
            origin[i + 2] === 0 &&
            origin[i + 3] === 255
          ) {
            const fgcolors = hexToRgb(fgcolor);
            qrcodePixels[i] = fgcolors[0];
            qrcodePixels[i + 1] = fgcolors[1];
            qrcodePixels[i + 2] = fgcolors[2];
            qrcodePixels[i + 3] = 255;
          }
        }
      }

      if (bgimg) {
        const bgiPixels = bgimg.data;
        for (let i = 0; i < qrcodePixels.length; i += 4) {
          if (
            i % 4 === 0 &&
            origin[i] === 255 &&
            origin[i + 1] === 255 &&
            origin[i + 2] === 255 &&
            origin[i + 3] === 255
          ) {
            qrcodePixels[i] = bgiPixels[i];
            qrcodePixels[i + 1] = bgiPixels[i + 1];
            qrcodePixels[i + 2] = bgiPixels[i + 2];
            qrcodePixels[i + 3] = bgiPixels[i + 3];
          }
        }
      }

      if (fgimg) {
        const fgiPixels = fgimg.data;
        for (let i = 0; i < qrcodePixels.length; i += 4) {
          if (
            i % 4 === 0 &&
            origin[i] === 0 &&
            origin[i + 1] === 0 &&
            origin[i + 2] === 0 &&
            origin[i + 3] === 255
          ) {
            qrcodePixels[i] = fgiPixels[i];
            qrcodePixels[i + 1] = fgiPixels[i + 1];
            qrcodePixels[i + 2] = fgiPixels[i + 2];
            qrcodePixels[i + 3] = fgiPixels[i + 3];
          }
        }
      }

      qrcodeCtx.putImageData(qrcodeimg, 0, 0);

      if (logo) {
        // 绘制外圆
        qrcodeCtx.beginPath();
        qrcodeCtx.arc(
          options.width! / 2,
          options.width! / 2,
          (options.width! / 8 + 4) | 0,
          0,
          2 * Math.PI,
          false
        );
        qrcodeCtx.fillStyle = '#ffffff';
        qrcodeCtx.fill();
        qrcodeCtx.clip();
        qrcodeCtx.closePath();

        // 绘制内圆
        qrcodeCtx.beginPath();
        qrcodeCtx.arc(
          options.width! / 2,
          options.width! / 2,
          (options.width! / 8) | 0,
          0,
          2 * Math.PI,
          false
        );
        qrcodeCtx.fill();
        qrcodeCtx.clip();
        qrcodeCtx.closePath();

        qrcodeCtx.drawImage(
          logo,
          (options.width! * 3) / 8,
          (options.width! * 3) / 8,
          (options.width! / 4) | 0,
          (options.width! / 4) | 0
        );
      }

      const qrcodeUrl = qrcodeCanvas.toDataURL();
      QrcodeParse(qrcodeUrl)
        .then(() => setError(''))
        .catch(() => setError('可能无法识别该图片中的二维码内容'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrcodeData]);

  useEffect(() => {
    deleteCanvas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [oType]);

  useEffect(() => {
    const content = oType === 'text' ? text : url;
    const qrcodeCanvas = document.getElementById('qrcode') as HTMLCanvasElement;
    if (!qrcodeCanvas || !content) return;
    QRCode.toCanvas(qrcodeCanvas, content, options);
    const qrcodeCtx = qrcodeCanvas!.getContext('2d', {
      willReadFrequently: true,
    })!;
    const qrcodeData = qrcodeCtx.getImageData(
      0,
      0,
      options.width!,
      options.width!
    );
    setQrcodeData(qrcodeData!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, bgimg, fgimg, bgcolor, fgcolor, logo, count]);

  return (
    <MainContent>
      <Stack direction='row' alignItems={'flex-start'} spacing={2}>
        <Stack
          direction='column'
          spacing={2}
          sx={{ width: `calc(100% - ${options.width! + 48}px)` }}
        >
          <CusTabs
            value={oType}
            list={OriginTypes}
            change={(v) => setOType(v as string)}
          />
          {oType === 'text' && (
            <Box>
              <OutlinedInput
                sx={{
                  width: '100%',
                  height: '100%',
                  fontFamily: 'Mono',
                  textarea: { height: '100% !important' },
                }}
                value={text}
                rows={3}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setText(event.target.value)
                }
                margin='dense'
                multiline
                autoFocus
              />
            </Box>
          )}
          {oType === 'url' && (
            <Box>
              <TextField
                sx={{
                  width: '100%',
                  input: {
                    p: '6px 10px',
                  },
                  'input::placeholder': {
                    fontSize: '14px',
                  },
                }}
                size='small'
                placeholder='请输入网址'
                variant='outlined'
                value={url}
                onChange={(e: any) => {
                  const v = e.target.value;
                  setError('');
                  if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v)) {
                    setError('请输入正确的网址');
                  } else {
                    setError('');
                  }
                  setUrl(v);
                }}
              />
            </Box>
          )}
          <Button
            variant='contained'
            sx={{ borderRadius: '4px' }}
            onClick={generate}
          >
            生成二维码
          </Button>
          {!!qrcodeData && (
            <>
              <Box sx={{ fontSize: '16px', fontWeight: 600, mb: 2 }}>Logo</Box>
              <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
                sx={{ fontSize: '14px' }}
              >
                <Button
                  variant='outlined'
                  sx={{ borderRadius: '4px', width: '120px' }}
                  size='small'
                  onClick={() => upload('logoInput')}
                >
                  上传 Logo
                </Button>
                {!!logo && (
                  <Box
                    sx={{ color: 'error.main', cursor: 'pointer' }}
                    onClick={() => {
                      setLogo(undefined);
                    }}
                  >
                    清除
                  </Box>
                )}
              </Stack>
              <Box sx={{ fontSize: '16px', fontWeight: 600, mb: 2 }}>颜色</Box>
              <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
                sx={{ fontSize: '14px' }}
              >
                <Box>背景色</Box>
                <TextField
                  sx={{
                    width: '120px',
                    input: {
                      p: '6px 10px',
                    },
                    'input::placeholder': {
                      fontSize: '14px',
                    },
                  }}
                  size='small'
                  type='color'
                  variant='outlined'
                  value={bgcolor}
                  onChange={(e: any) => {
                    setBgimg(undefined);
                    setBgcolor(e.target.value);
                  }}
                />
                <Button
                  variant='outlined'
                  sx={{ borderRadius: '4px', width: '120px' }}
                  size='small'
                  onClick={() => upload('bgiInput')}
                >
                  {!!bgimg ? '更换背景图' : '上传背景图'}
                </Button>
                {(!!bgimg || bgcolor !== '#ffffff') && (
                  <Box
                    sx={{ color: 'error.main', cursor: 'pointer' }}
                    onClick={() => {
                      setBgimg(undefined);
                      setBgcolor('#ffffff');
                    }}
                  >
                    清除
                  </Box>
                )}
              </Stack>
              <Stack
                direction={'row'}
                alignItems={'center'}
                spacing={2}
                sx={{ fontSize: '14px' }}
              >
                <Box>前景色</Box>
                <TextField
                  sx={{
                    width: '120px',
                    input: {
                      p: '6px 10px',
                    },
                    'input::placeholder': {
                      fontSize: '14px',
                    },
                  }}
                  size='small'
                  type='color'
                  variant='outlined'
                  value={fgcolor}
                  onChange={(e: any) => {
                    setFgimg(undefined);
                    setFgcolor(e.target.value);
                  }}
                />
                <Button
                  variant='outlined'
                  sx={{ borderRadius: '4px', width: '120px' }}
                  size='small'
                  onClick={() => upload('fgiInput')}
                >
                  {!!fgimg ? '更换前景图' : '上传前景图'}
                </Button>
                {(!!fgimg || fgcolor !== '#000000') && (
                  <Box
                    sx={{ color: 'error.main', cursor: 'pointer' }}
                    onClick={() => {
                      setFgimg(undefined);
                      setFgcolor('#000000');
                    }}
                  >
                    清除
                  </Box>
                )}
              </Stack>
              <Box sx={{ fontSize: '16px', fontWeight: 600, mb: 2 }}>其他</Box>
              <Stack spacing={2} sx={{ fontSize: '14px' }}>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Box>码边距</Box>
                  <Select
                    size='small'
                    displayEmpty
                    sx={{ width: '150px', height: '38px', fontSize: '14px' }}
                    value={options.margin!.toString()}
                    onChange={(e: SelectChangeEvent<string>) => {
                      setOptions({ ...options, margin: +e.target.value });
                    }}
                  >
                    {mgOptions.map((it) => (
                      <MenuItem value={it.value} key={it.value}>
                        {it.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Box>容错率</Box>
                  <Select
                    size='small'
                    displayEmpty
                    sx={{ width: '150px', height: '38px', fontSize: '14px' }}
                    value={options.errorCorrectionLevel}
                    onChange={(e: SelectChangeEvent<string>) => {
                      setOptions({
                        ...options,
                        errorCorrectionLevel: e.target
                          .value as QRCodeErrorCorrectionLevel,
                      });
                    }}
                  >
                    {eclOptions.map((it) => (
                      <MenuItem value={it.value} key={it.value}>
                        {it.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Stack>
            </>
          )}
        </Stack>
        <Box
          sx={{
            width: options.width! + 32 + 'px',
            border: '1px solid rgba(0,0,0,0.2)',
            borderRadius: '4px',
            p: 2,
          }}
        >
          <Box
            sx={{
              borderRadius: '4px',
              boxShadow: '0 0 5px 2px rgba(0,0,0,0.05)',
              width: '400px',
              height: '400px',
            }}
          >
            <Box
              component='canvas'
              id='qrcode'
              width='400px'
              height='400px'
            ></Box>
          </Box>
          {error && (
            <Box sx={{ color: 'error.main', fontSize: '12px', mt: 2 }}>
              {error}
            </Box>
          )}
          {!!qrcodeData ? (
            <Stack direction='column' spacing={2} sx={{ mt: 2 }}>
              <Box
                sx={{
                  fontSize: '12px',
                  color: 'rgba(0,0,0,0.5)',
                  textAlign: 'center',
                }}
              >
                {LevelErrorResistance[options.errorCorrectionLevel!]}容错{' '}
                {options.width}x{options.width}px
              </Box>
              <Stack direction={'row'} spacing={2}>
                <Button
                  variant='outlined'
                  sx={{ borderRadius: '4px', width: '100%' }}
                  onClick={clear}
                >
                  清除美化
                </Button>
                <Button
                  variant='outlined'
                  sx={{ borderRadius: '4px', width: '100%' }}
                  onClick={deleteCanvas}
                >
                  清空内容
                </Button>
                <Button
                  variant='contained'
                  sx={{ borderRadius: '4px', width: '100%' }}
                  onClick={download}
                >
                  下载图片
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Box
              sx={{
                fontSize: '12px',
                mt: 1,
                textAlign: 'center',
                color: 'rgba(0,0,0,0.5)',
              }}
            >
              此处预览二维码
            </Box>
          )}
        </Box>
        <Box
          component={'input'}
          id='bgiInput'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={(event) => addGi(event, 'bgimg')}
        />
        <Box
          component={'input'}
          id='fgiInput'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={(event) => addGi(event, 'fgimg')}
        />
        <Box
          component={'input'}
          id='logoInput'
          type='file'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={(event) => addGi(event, 'logoimg')}
        />
      </Stack>
    </MainContent>
  );
};

export default _C;
