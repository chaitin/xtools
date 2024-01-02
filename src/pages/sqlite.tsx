import MainContent from '@/components/MainContent';
import { Box, Button, Stack, Tab } from '@mui/material';

import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';

import initSqlJs, { Database } from 'sql.js';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { VariableSizeGrid } from 'react-window';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import alert from '@/components/Alert';

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

const Module: React.FC = () => {
  const [fileName, setFileName] = useState<string>();
  const [tables, setTables] = useState<Array<string>>([]);
  const [db, setDb] = useState<Database>();
  const [columns, setColumns] = useState<Array<string>>([]);
  const [values, setValues] = useState<Array<Array<string>>>([]);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [widths, setWidths] = useState<Array<number>>([]);

  const loadDB = useCallback((arr: ArrayBuffer) => {
    initSqlJs({ locateFile: () => './wasm/sqlite.wasm' })
      .then((SQL) => {
        console.log('then', arr.byteLength);
        const _db = new SQL.Database(new Uint8Array(arr));
        setDb(_db);
        if (_db) {
          setTables([
            'sqlite_master',
            ...(
              _db.exec(
                `select name from sqlite_master where type = 'table';`
              )[0].values as Array<Array<string>>
            ).map((v) => v[0]),
          ]);
          setTabIndex(0);
          console.log('db loaded');
        }
      })
      .catch((e) => {
        console.log('catch', e);
      });
  }, []);

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      const reader = new FileReader();
      reader.onload = function (e) {
        if (e.target !== null) {
          loadDB(e.target.result as ArrayBuffer);
        }
      };
      setFileName(files[0].name);
      reader.readAsArrayBuffer(files[0]);
    },
    []
  );

  const handleCopyClick = useCallback(() => {
    alert.success('已复制到剪切板');
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, index: number) => {
    console.log('change', index);
    const r = db?.exec(`select * from ${tables[index]}`)[0];
    if (r) {
      const _width = Array(r?.columns.length).fill(0);
      for (let i = 0; r?.columns && i < r?.columns.length; i++) {
        let t = 0;
        for (let j = 0; r?.values && j < r?.values.length; j++) {
          if (r.values[j][i]) {
            const s = r.values[j][i]?.toString() || '';
            t += s.length;
          }
        }
        if (r?.values.length === 0) {
          t = r?.columns[i].length;
        } else {
          t = Math.ceil(t / r?.values.length);
        }
        if (t < r?.columns[i].length) {
          t = r?.columns[i].length;
        }
        t = t * 12 + 20;
        if (t < 32) {
          t = 32;
        } else if (t > 800) {
          t = 800;
        }
        _width[i] = t;
      }
      setWidths(_width);
      setColumns(r?.columns as Array<string>);
      setValues([
        r?.columns as Array<string>,
        ...(r?.values as Array<Array<string>>),
      ]);
      setTabIndex(index);
    }
  };

  const cells = useCallback(
    ({
      columnIndex,
      rowIndex,
      style,
    }: {
      columnIndex: number;
      rowIndex: number;
      style: React.CSSProperties;
    }) => (
      <CopyToClipboard
        text={
          values[rowIndex][columnIndex] ? values[rowIndex][columnIndex] : ''
        }
        onCopy={handleCopyClick}
      >
        <Box
          sx={{
            fontWeight: rowIndex === 0 ? '600' : '400',
            color: rowIndex === 0 ? '#F6F7F9' : '',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: '6px  6px',
            fontFamily: 'Mono',
            backgroundColor:
              rowIndex === 0
                ? '#ABB2BF'
                : rowIndex % 2 === 0
                  ? '#21252B'
                  : '#282C34',
            '&:hover':
              rowIndex === 0
                ? {}
                : {
                    backgroundColor: '#323842',
                    fontWeight: '600',
                    color: '#F6F7F9',
                    cursor: 'pointer',
                  },
            ...style,
          }}
        >
          {values[rowIndex][columnIndex] ? values[rowIndex][columnIndex] : '-'}
        </Box>
      </CopyToClipboard>
    ),
    [values]
  );

  return (
    <MainContent>
      <Stack spacing={1} sx={{ height: '100%' }}>
        <Button
          startIcon={<OpenInBrowserIcon />}
          component='label'
          variant='outlined'
          sx={{
            borderRadius: '4px',
            width: '100%',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textTransform: 'none',
          }}
        >
          {fileName ? '已加载文件 - ' + fileName : '选择 Sqlite 文件'}
          <VisuallyHiddenInput type='file' onChange={handleSelectFile} />
        </Button>
        {tables.length > 0 ? (
          <Box
            sx={{
              height: '100%',
              border: 'solid 1px #ABB2BF',
              borderRadius: '4px',
              padding: 0,
            }}
          >
            <TabContext value={tabIndex.toString()}>
              <Box sx={{ borderBottom: 1, borderColor: '#ABB2BF' }}>
                <TabList onChange={handleTabChange}>
                  {tables?.map((v, index) => (
                    <Tab
                      label={v}
                      value={index.toString()}
                      key={index}
                      sx={{ textTransform: 'none', fontFamily: 'Mono' }}
                    ></Tab>
                  ))}
                </TabList>
              </Box>
              {tables?.map((v, index) => (
                <TabPanel
                  value={index.toString()}
                  key={index}
                  sx={{
                    padding: 0,
                    height: '100%',
                    backgroundColor: '#21252B',
                    fontSize: '12px',
                    color: '#ABB2BF',
                  }}
                >
                  <AutoSizer>
                    {(size: Size) => (
                      <VariableSizeGrid
                        columnCount={columns.length}
                        columnWidth={(index) => widths[index]}
                        height={size.height}
                        rowCount={values.length}
                        rowHeight={() => 32}
                        width={size.width}
                      >
                        {cells}
                      </VariableSizeGrid>
                    )}
                  </AutoSizer>
                </TabPanel>
              ))}
            </TabContext>
          </Box>
        ) : (
          <></>
        )}
      </Stack>
    </MainContent>
  );
};

export default Module;
