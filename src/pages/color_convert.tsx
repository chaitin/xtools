import alert from '@/components/Alert';
import FormItem from '@/components/FormItem';
import MenuView from '@/components/MainContent';
import { ToolsForm } from '@/components/Tools';
import { Box, Button, OutlinedInput, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';


interface ColorConversionResult {
  rgb: string
  rgba: string;
  hsl: string;
  hex: string;
}
function rgbaToHsl(rgbaValues: number[]): string {
  const r = rgbaValues[0] / 255;
  const g = rgbaValues[1] / 255;
  const b = rgbaValues[2] / 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0
  let l = (max + min) / 2;
  if (max !== min) {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return 'hsl(' + Math.round(h * 360) + ',' + Math.round(s * 100) + "%" + ',' + Math.round(l * 100) + "%" + ')';

}

function rgbaToHex(rgbaValues: number[]): string {
  const r = Math.round(rgbaValues[0]).toString(16).padStart(2, "0");
  const g = Math.round(rgbaValues[1]).toString(16).padStart(2, "0");
  const b = Math.round(rgbaValues[2]).toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
}

function hslToRgba(hslValues: number[]): string {
  const h = hslValues[0] / 360;
  const s = hslValues[1] / 100;
  const l = hslValues[2] / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // 灰度
  } else {
    const hueToRgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = Math.round(hueToRgb(p, q, h + 1 / 3) * 255);
    g = Math.round(hueToRgb(p, q, h) * 255);
    b = Math.round(hueToRgb(p, q, h - 1 / 3) * 255);
  }

  return `rgba(${r}, ${g}, ${b}, 1)`;
}
function hslToHex(hslValues: number[]) {
  const rgba = hslToRgba(hslValues);
  return rgbaToHex(parseRgbaValues(rgba));
}

// HEX转换为RGBA
function hexToRgba(hex: string) {
  const hexValues = hex.replace("#", "").match(/.{1,2}/g);
  try {
    const rgbaValues = hexValues?.map(value => parseInt(value, 16));
    if (!rgbaValues) throw Error('')
    return `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, ${(rgbaValues[3] || 255) / 255})`;
  } catch (e) {
    console.log(e)
  }
  return 'no valid string'
}

// HEX转换为HSL
function hexToHsl(hex: string) {
  const rgba = hexToRgba(hex);
  return rgbaToHsl(parseRgbaValues(rgba));
}

// 解析RGBA值
function parseRgbaValues(rgba: string) {
  const rgbaValues = rgba.substring(5, rgba.length - 1).split(",").map(value => parseInt(value));
  return rgbaValues;
}

function rgbaTrans(color: string): string {
  // 移除颜色字符串中的空格
  color = color.replace(/\s/g, '');

  // RGBA 格式转换为 RGB 格式
  if (color.startsWith('rgba(')) {
    const match = color.match(/^rgba\((\d+),(\d+),(\d+),(\d+(\.\d*)?)\)/);
    if (match) {
      const red = parseInt(match[1]);
      const green = parseInt(match[2]);
      const blue = parseInt(match[3]);

      return `rgb(${red},${green},${blue})`;
    }
  }

  // RGB 格式转换为 RGBA 格式
  if (color.startsWith('rgb(')) {
    const match = color.match(/^rgb\((\d+),(\d+),(\d+)\)/);
    if (match) {
      const red = parseInt(match[1]);
      const green = parseInt(match[2]);
      const blue = parseInt(match[3]);

      return `rgba(${red},${green},${blue},1)`;
    }
  }

  // 如果无法匹配 RGBA 或 RGB 格式，则返回原始值
  return color;
}

function convertColor(colorString: string): ColorConversionResult | string {
  colorString = colorString.toLowerCase().trim();

  if (colorString.startsWith("rgba")) {
    const rgbaValues = colorString.substring(5, colorString.length - 1).split(",").map(value => parseFloat(value));
    const rgba = `rgba(${rgbaValues[0]}, ${rgbaValues[1]}, ${rgbaValues[2]}, ${rgbaValues[3]})`
    return {
      rgb: rgbaTrans(rgba),
      rgba,
      hsl: rgbaToHsl(rgbaValues),
      hex: rgbaToHex(rgbaValues),
    };
  }

  if (colorString.startsWith("hsl")) {
    const hslValues = colorString.substring(4, colorString.length - 1).split(",").map(value => parseFloat(value));
    const rgba = hslToRgba(hslValues)
    return {
      rgb: rgbaTrans(rgba),
      rgba,
      hsl: `hsl(${hslValues[0]}, ${hslValues[1]}%, ${hslValues[2]}%)`,
      hex: hslToHex(hslValues),
    };
  }

  if (colorString.startsWith("#")) {
    const rgba = hexToRgba(colorString)
    return {
      rgb: rgbaTrans(rgba),
      rgba,
      hsl: hexToHsl(colorString),
      hex: colorString,
    };
  }

  return "请输入正确的色值";
}

const ColorConvert: React.FC = () => {
  const [colorStr, setColorStr] = useState<string>('');
  const [result, setResult] = useState<ColorConversionResult | string>({
    rgb: 'rgb(51,51,51)',
    rgba: 'rgba(51, 51, 51, 1)',
    hsl: 'hsl(0, 0%, 20%)',
    hex: '#333333',
  })

  const generateColor = () => {
    const res = convertColor(colorStr)
    if (typeof res === 'string') alert.warning(res);
    else setResult(res)
  }
  return (
    <MenuView>
      <ToolsForm sx={{ width: '100%' }}>
        <FormItem label='颜色值' singleLine>
          <Stack direction='row' spacing={2} alignItems='center'>
            <OutlinedInput
              required
              type='string'
              size='small'
              value={colorStr}
              placeholder='请输入颜色值，例如：#333333、rgba(0,0,0,1)等'
              onChange={(event) => setColorStr(event.target.value)}
              margin='dense'
              sx={{ width: '615px' }}
            />
            <Button
              size='small'
              sx={{
                fontSize: '14px',
                maxWidth: '100px',
                borderRadius: '4px',
                ml: 'auto',
                height: '28px'
              }}
              color='primary'
              variant='contained'
              onClick={generateColor}
            >
              立即生成
            </Button>
          </Stack>
        </FormItem>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>预览颜色</TableCell>
                <TableCell align="right">格式</TableCell>
                <TableCell align="right">转换结果</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(result).map((key) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box sx={{ width: '100%', height: '22px', bgcolor: (result as any)[key] }}></Box>
                  </TableCell>
                  <TableCell align="right">{key}</TableCell>
                  <TableCell align="right" sx={{ cursor: 'pointer' }}>
                    <CopyToClipboard text={(result as any)[key]} onCopy={() => alert.success('复制成功')}>
                      <span>{(result as any)[key]}</span>
                    </CopyToClipboard>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Link href='https://mui.com/material-ui/customization/color/' target='_blank'>
          <Typography sx={{ mb: 1 }} variant='subtitle2'>
            MUI 官方配色表
          </Typography>
        </Link>
      </ToolsForm>
    </MenuView>
  );
};

export default ColorConvert
