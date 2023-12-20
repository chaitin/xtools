import React, { useCallback, useEffect, useState } from 'react'
import Table from 'rc-table'
import { Box, Button, Divider, OutlinedInput, Stack, Switch, TextField } from "@mui/material"
import { useCSV } from '@/hooks';
import { CopyToClipboard } from "react-copy-to-clipboard";
import alert from "@/components/Alert";
import MenuView from '@/components/MenuView'
import { json2csv } from 'json-2-csv'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CusTabs from '@/components/CusTabs';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

const tabs = [
  { label: 'CSV', value: 1 },
  { label: 'EXCEL', value: 2 },
]

const JSONToCSV = () => {
  const [pres, widths, setPres, exportFile] = useCSV<{ [key: string]: any }>([])
  const [error, setError] = useState<string>('')
  const [json, setJson] = useState<string>('')

  const [curTab, setCurTab] = useState<number>(1)

  const [csv, setCsv] = useState<string>('')
  const [excludeKeys, setExcludeKeys] = useState<string>('')
  const [expandNestedObjects, setExpandNestedObjects] = useState<boolean>(true)
  const [delimiter, setDelimiter] = useState<any>({
    field: ',',
  })

  const handleClick = useCallback(() => {
    alert.success("复制成功");
  }, [])

  const getCSV = (v: any) => {
    setCsv(json2csv(v, {
      expandNestedObjects,
      delimiter,
      excludeKeys: excludeKeys.replace(/\s/g, '').split(',')
    }))
  }

  const saveStringToFile = () => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'jsontocsv';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const content = e.target.result;
          setJson(content);
          setError('');
        };

        reader.readAsText(file);
      } else {
        setJson('');
        setError('Invalid file type.');
      }
    }
  };

  const handleButtonClick = () => {
    // 触发隐藏的input元素
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  useEffect(() => {
    try {
      const v = JSON.parse(json || '')
      getCSV(v)
    } catch (error) {

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expandNestedObjects, delimiter, excludeKeys])

  useEffect(() => {
    if (json === '') {
      setPres([])
      setCsv('')
      setError('')
      return
    }
    try {
      const value = JSON.parse(json || '')
      const arr = Array.isArray(value) ? value : [value]
      const d = arr.map(it => {
        const obj: any = {}
        for (const key in it) {
          if (typeof it[key] === 'object' || typeof it[key] === 'boolean') {
            obj[key] = JSON.stringify(it[key])
          } else {
            obj[key] = it[key]
          }
        }
        return obj
      })
      setPres(d)
      getCSV(arr)
      setError('')
    } catch (error) {
      setPres([])
      setCsv('')
      setError('非 JSON 格式，无法转换为 ' + (curTab === 1 ? 'CSV' : 'EXCEL'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [json])

  return (
    <MenuView>
      <Stack sx={{
        mt: "24px",
        gap: "18px",
        maxWidth: "1020px",
        fontFamily: "Mono",
        width: '838px',
        mx: 'auto',
        ".rc-table": {
          border: '1px solid #eee',
          borderRadius: '4px',
        },
        ".rc-table table": {
          width: '100%',
          borderCollapse: 'collapse',
        },
        '.rc-table-thead .rc-table-cell': {
          textAlign: 'left',
          paddingLeft: '24px',
          backgroundColor: '#eee',
          fontSize: '12px',
          height: '28px',
          fontWeight: 500,
          fontFamily: 'Mono'
        },
        '.rc-table-tbody .rc-table-row': {
          borderBottom: '1px solid #eee',
        },
        '.rc-table-tbody .rc-table-cell': {
          paddingLeft: pres.length === 0 ? '0' : '24px',
          fontSize: '14px',
          paddingTop: '12px',
          paddingBottom: '12px',
          fontFamily: 'Mono'
        },
        '#ace-editor *': {
          fontFamily: "Mono",
        }
      }}>
        <AceEditor
          name="ace-editor"
          fontSize={16}
          style={{
            width: '100%',
            borderRadius: '4px',
            height: 'calc(100vh - 557px)',
          }}
          value={json}
          mode="json"
          theme="monokai"
          onChange={setJson}
          editorProps={{ $blockScrolling: true }}
        />
        <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
          <CusTabs list={tabs} value={curTab} size='small' change={(v: number) => {
            setCurTab(v)
          }} />
          <Stack direction="row" alignItems={"center"} spacing={2}>
            {curTab === 2 && <Button variant='contained' size='small' sx={{ borderRadius: '4px' }} disabled={!!error || !json} onClick={exportFile}>导出表格</Button>}
            <Button sx={{ borderRadius: '4px' }} size='small' variant="outlined" onClick={handleButtonClick}>上传 JSON 文件</Button>
          </Stack>

        </Stack>
        {curTab === 1 && <Box sx={{ position: 'relative' }}>
          <Stack direction="row" alignItems={"center"} justifyContent={"space-between"}>
            <Stack direction="row" alignItems={"center"} spacing={2} divider={<Divider orientation="vertical" flexItem />}>
              <Stack direction="row" alignItems={"center"}>
                <Box sx={{ color: '#999', fontSize: '14px' }}>分隔符：</Box>
                <TextField
                  sx={{
                    width: "100px",
                    input: {
                      p: '6px 10px'
                    }
                  }}
                  size='small'
                  variant='outlined'
                  value={delimiter.field}
                  onChange={(e) => {
                    setDelimiter({
                      ...delimiter,
                      field: e.target.value
                    })
                  }}
                />
              </Stack>
              <Stack direction="row" alignItems={"center"}>
                <Box sx={{ color: '#999', fontSize: '14px' }}>排除键：</Box>
                <TextField
                  sx={{
                    width: "230px",
                    input: {
                      p: '6px 10px'
                    },
                    'input::placeholder': {
                      fontSize: '14px'
                    }
                  }}
                  size='small'
                  placeholder='英文逗号隔开：key1,key2'
                  variant='outlined'
                  value={excludeKeys}
                  onChange={(e) => {
                    setExcludeKeys(e.target.value)
                  }}
                />
              </Stack>
              <Stack direction="row" alignItems={"center"}>
                <Box sx={{ color: '#999', fontSize: '14px' }}>深度递归：</Box>
                <Switch checked={expandNestedObjects} onChange={(e) => setExpandNestedObjects(e.target.checked)} />
              </Stack>
            </Stack>
            <Button variant='contained' size='small' sx={{ borderRadius: '4px' }} disabled={!!error || !json} onClick={saveStringToFile}>导出 CSV </Button>
          </Stack>
          <Box
            sx={{
              width: "100%",
              mt: 2,
              fontFamily: "Mono",
              textarea: { paddingRight: "35px" },
              borderRadius: '4px',
              border: '1px solid #eee',
              height: '200px',
              overflow: 'hidden',
              p: 2,
            }}
          >
            {error && json !== '' ? <Box sx={{ color: "error.main", fontSize: "12px" }}>{error}</Box>
              : <div style={{ fontFamily: "Mono", width: 'calc(100% - 32px)', height: 'calc(200px - 32px)', overflow: 'scroll', whiteSpace: 'pre' }}>{csv}</div>}
          </Box>
          <CopyToClipboard
            text={csv}
            onCopy={handleClick}
          >
            <ContentCopyIcon sx={{
              zIndex: 1,
              position: 'absolute',
              right: '12px',
              top: '70px',
              cursor: 'pointer',
              '& svg': {
                width: '20px',
                height: '20px',
              },
            }} fontSize="small" color="primary" />
          </CopyToClipboard>
        </Box>}
        {curTab === 2 && <Table
          columns={pres.length > 0 ? Object.keys(pres[0]).map((it, idx) => {
            return {
              title: it,
              dataIndex: it,
              key: it,
              width: widths[idx]
            }
          }) : []}
          data={pres}
          rowKey="key"
          scroll={pres.length === 0 ? {} : {
            y: 224,
            x: widths.reduce((a, b) => a + b, 0)
          }}
          emptyText={<div style={{ textAlign: 'center', color: error ? 'red' : '#999', fontSize: '12px' }}>{error || '暂无数据'}</div>}
        />}
        <input
          id="fileInput"
          type="file"
          accept=".json"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Stack>
    </MenuView>
  )
}

export default JSONToCSV