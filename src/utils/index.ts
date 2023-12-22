export function getExcelCellWidth(value: string = '') {
  if (!value) return 0;
  if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
    // @ts-ignore
    const cLen = value!.match(/[\u4e00-\u9fa5]/g).length;
    const otherLen = value.length - cLen;
    const length = cLen * 2.5 + otherLen * 1.1;
    return length < 15 ? 15 : length;
  }
  ``;
  const length = value.toString().length * 1.1;
  return length < 15 ? 15 : length;
}
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
