// 计算导出后的 excel 单元格宽度
export function getExcelCellWidth(value: string = '') {
  if (!value) return 0;
  if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
    // @ts-ignore
    const cLen = value!.match(/[\u4e00-\u9fa5]/g).length;
    const otherLen = value.length - cLen;
    const length = cLen * 2.5 + otherLen * 1.1;
    return length < 15 ? 15 : length;
  }
  const length = value.toString().length * 1.1;
  return length < 15 ? 15 : length;
}
// 计算表格列宽
export function getRCTableCellWidth(value: string = '') {
  if (!value) return 0;
  if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
    // @ts-ignore
    const cLen = value!.match(/[\u4e00-\u9fa5]/g).length;
    const otherLen = value.length - cLen;
    const length = cLen * 27 + otherLen * 9 + 10;
    return length < 40 ? 40 : length;
  }
  ``;
  const length = value.toString().length * 9 + 10;
  return length < 40 ? 40 : length;
}
// 计算单元格宽度
export function setCellWidthInExcel(data: any[]) {
  const wchs: number[] = Object.keys(data[0] || {}).map((it) =>
    getExcelCellWidth(it)
  );
  data.map((it) => {
    const values: string[] = Object.values(it || {}).map((it) =>
      JSON.stringify(it)
    );
    for (let i = 0; i < values.length; i++) {
      wchs[i] = Math.max(getExcelCellWidth(values[i]), wchs[i]);
    }
  });
  const tcwchs: number[] = Object.keys(data[0] || {}).map((it) =>
    getRCTableCellWidth(it)
  );
  data.map((it) => {
    const values: string[] = Object.values(it || {}).map((it) =>
      JSON.stringify(it)
    );
    for (let i = 0; i < values.length; i++) {
      tcwchs[i] = Math.max(getRCTableCellWidth(values[i]), tcwchs[i]);
    }
  });
  return [wchs, tcwchs];
}
// 转化图片
export function getConversionUrlByImageFile(
  file: File,
  type: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const imageFileReader = new FileReader();
    imageFileReader.onload = (e) => {
      const image = new Image();
      image.src = e.target?.result as string;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        canvas.getContext('2d')?.drawImage(image, 0, 0);
        const conversion = canvas.toDataURL(type);
        resolve(conversion);
      };
    };
    imageFileReader.readAsDataURL(file);
  });
}
