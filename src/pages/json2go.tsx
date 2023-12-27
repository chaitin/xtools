import alert from '@/components/Alert';
import MainContent from '@/components/MainContent';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-golang';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';
import gofmt from 'gofmt.js';
import { jsonToGo } from '@/asset/json2go/index.js';

const mock =
  '{\n' +
  '  "name": "John Doe",\n' +
  '  "age": 25,\n' +
  '  "is_student": false,\n' +
  '  "grades": [95, 87, 92],\n' +
  '  "address": {\n' +
  '    "street": "123 Main St",\n' +
  '    "city": "Anytown",\n' +
  '    "zipCode": "12345"\n' +
  '  },\n' +
  '  "contacts": [\n' +
  '    {\n' +
  '      "type": "email",\n' +
  '      "value": "john.doe@example.com"\n' +
  '    },\n' +
  '    {\n' +
  '      "type": "phone",\n' +
  '      "value": "555-1234"\n' +
  '    }\n' +
  '  ],\n' +
  '  "is_active": true,\n' +
  '  "notes": null\n' +
  '}';

const Json2Go: React.FC = () => {
  const [json, setJson] = useState<string>('');
  const [fjson, setGoStructOutput] = useState<string>('');

  const handleCopy = useCallback(() => {
    alert.success('复制成功');
  }, []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type === 'application/json') {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          const content = e.target.result;
          Json2Go(content);
        };

        reader.readAsText(file);
      } else {
        setJson('');
        alert.error('无效的文件');
      }
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const downloadFile = () => {
    const blob = new Blob([fjson], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const t = new Date().getTime();
    link.download = t.toString() + '.go';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const Json2Go = (s: string) => {
    setJson(s);
    if (s.length == 0) {
      setGoStructOutput('');
      return;
    }

    try {
      setGoStructOutput(gofmt(jsonToGo(s, '').go));
    } catch (error) {
      setGoStructOutput('无效的 JSON, 转换失败。');
    }
  };

  useEffect(() => {
    Json2Go(mock);
  }, []);

  return (
    <MainContent>
      <Grid
        sx={{
          mt: '24px',
          maxWidth: '1020px',
          height: '100%',
          '#json-input *': {
            fontFamily: 'Mono',
          },
          '#json-output *': {
            fontFamily: 'Mono',
          },
        }}
        container
        spacing={2}
      >
        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 1,
            }}
          >
            <div>输入</div>
            <Box>
              <Button
                onClick={() => {
                  setJson('');
                  setGoStructOutput('');
                }}
              >
                <DeleteIcon fontSize='small' color='primary' />
              </Button>
              <Button onClick={handleUploadClick}>
                <FileUploadIcon fontSize='small' color='primary' />
              </Button>
            </Box>
          </Box>

          <AceEditor
            name='json-input'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 345px)',
              fontFamily: 'Mono',
            }}
            value={json}
            mode='json'
            theme='monokai'
            onChange={Json2Go}
            tabSize={2}
          />
          <input
            id='fileInput'
            type='file'
            accept='.json'
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Grid>

        <Grid item xs={6}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              p: 1,
            }}
          >
            <div>输出</div>
            <Box>
              <Button onClick={downloadFile}>
                <DownloadIcon fontSize='small' color='primary' />
              </Button>

              <CopyToClipboard text={fjson} onCopy={handleCopy}>
                <Button>
                  <ContentCopyIcon fontSize='small' color='primary' />
                </Button>
              </CopyToClipboard>
            </Box>
          </Box>

          <AceEditor
            name='json-output'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 345px)',
              fontFamily: 'Mono',
            }}
            value={fjson}
            mode='golang'
            theme='monokai'
            onChange={setGoStructOutput}
            editorProps={{ $blockScrolling: true }}
          />
        </Grid>
      </Grid>
    </MainContent>
  );
};

export default Json2Go;
