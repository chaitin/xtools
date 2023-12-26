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

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

const mock = '{"id": 1, "name": "test"}';

const JsonFmt: React.FC = () => {
  const [json, setJson] = useState<string>('');
  const [fjson, setFjson] = useState<string>('');

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
          fmtJson(content);
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
    link.download = t.toString() + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fmtJson = (s: string) => {
    setJson(s);
    if (s.length == 0) {
      setFjson('');
      return;
    }

    try {
      let a = JSON.parse(s);
      setFjson(JSON.stringify(a, null, 2));
    } catch (error) {
      setFjson('无效的 JSON');
    }
  };

  useEffect(() => {
    fmtJson(mock);
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
                  setFjson('');
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
            onChange={fmtJson}
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
            mode='json'
            theme='monokai'
            onChange={setFjson}
            editorProps={{ $blockScrolling: true }}
          />
        </Grid>
      </Grid>
    </MainContent>
  );
};

export default JsonFmt;
