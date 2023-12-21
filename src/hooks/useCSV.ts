import { setCellWidthInExcel } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { utils, writeFile } from 'xlsx';

export function useCSV<T>(
  value: T[]
): [T[], number[], React.Dispatch<React.SetStateAction<T[]>>, () => void] {
  const [pres, setPres] = useState<T[]>(value);
  const [widths, setWidths] = useState<number[]>([]);
  const [rcWidths, setRcWidths] = useState<number[]>([]);

  useEffect(() => {
    const [wchs, tcwchs] = setCellWidthInExcel(pres);
    setWidths(wchs);
    setRcWidths(tcwchs);
  }, [pres]);

  const exportFile = useCallback(() => {
    const ws = utils.json_to_sheet(pres);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'jsontoexcel');

    ws['!cols'] = widths.map((it) => ({ wch: it }));

    writeFile(wb, 'jsontoexcel.xlsx');
  }, [pres, widths]);

  return [pres, rcWidths, setPres, exportFile];
}
