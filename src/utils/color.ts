type RGBColor = {
  r: number;
  g: number;
  b: number;
};

type HexColor = string;

type HSLColor = {
  h: number;
  s: number;
  l: number;
};

type HWBColor = {
  h: number;
  w: number;
  b: number;
};

function rgbToHex(r: number, g: number, b: number): HexColor {
  const toHex = (value: number): string => {
    const hex = Math.round(Math.min(255, Math.max(0, value))).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hexR = toHex(r);
  const hexG = toHex(g);
  const hexB = toHex(b);

  return `#${hexR}${hexG}${hexB}`;
}

function rgbToHsl(r: number, g: number, b: number): HSLColor {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }

    h *= 60;
  }

  return { h, s, l };
}

function rgbToHwb(r: number, g: number, b: number): HWBColor {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const h = rgbToHsl(r, g, b).h;

  const w = (1 / 255) * min;
  const bVal = 1 - max / 255;

  return { h, w, b: bVal };
}

export function rgbConvert(r: number, g: number, b: number): any {
  const hsl = rgbToHsl(r, g, b);
  const hwb = rgbToHwb(r, g, b);
  return {
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${hsl.h.toFixed(2)}, ${(hsl.s * 100).toFixed(2)}%, ${(
      hsl.l * 100
    ).toFixed(2)}%)`,
    hwb: `hwb(${hwb.h.toFixed(2)}, ${(hwb.w * 100).toFixed(2)}%, ${(
      hwb.b * 100
    ).toFixed(2)}%)`,
    hex: rgbToHex(r, g, b),
  };
}
