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
import 'ace-builds/src-noconflict/mode-sql';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/theme-monokai';
import { format } from 'sql-formatter';

const mock = `SELECT t1.name, t1.column2, t2.column3 FROM table1 t1
LEFT JOIN table2 t2 ON t1.common_column = t2.common_column
WHERE your_condition GROUP BY t1.name,
ORDER BY t1.name ASC, t2.column3 DESC;`;

const SQLFmt: React.FC = () => {
  const [sql, setSQL] = useState<string>('');
  const [fsql, setSQLFmtOutput] = useState<string>('');

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
          SQLFmt(content);
        };

        reader.readAsText(file);
      } else {
        setSQL('');
        alert.error('无效的文件');
      }
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const downloadFile = () => {
    const blob = new Blob([fsql], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const t = new Date().getTime();
    link.download = t.toString() + '.sql';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const SQLFmt = (s: string) => {
    setSQL(s);
    if (s.length == 0) {
      setSQLFmtOutput('');
      return;
    }

    try {
      setSQLFmtOutput(format(s));
    } catch (error) {
      setSQLFmtOutput('无效的 SQL, 转换失败。');
    }
  };

  useEffect(() => {
    SQLFmt(mock);
  }, []);

  return (
    <MainContent>
      <Grid
        sx={{
          mt: '24px',
          maxWidth: '1020px',
          height: '100%',
          '#sql-input *': {
            fontFamily: 'Mono',
          },
          '#sql-output *': {
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
                  setSQL('');
                  setSQLFmtOutput('');
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
            name='sql-input'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 345px)',
              fontFamily: 'Mono',
            }}
            value={sql}
            mode='sql'
            theme='monokai'
            onChange={SQLFmt}
            tabSize={2}
          />
          <input
            id='fileInput'
            type='file'
            accept='.sql'
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

              <CopyToClipboard text={fsql} onCopy={handleCopy}>
                <Button>
                  <ContentCopyIcon fontSize='small' color='primary' />
                </Button>
              </CopyToClipboard>
            </Box>
          </Box>

          <AceEditor
            name='sql-output'
            fontSize={16}
            style={{
              width: '100%',
              borderRadius: '4px',
              height: 'calc(100vh - 345px)',
              fontFamily: 'Mono',
            }}
            value={fsql}
            mode='sql'
            theme='monokai'
            onChange={setSQLFmtOutput}
            editorProps={{ $blockScrolling: true }}
          />
        </Grid>
      </Grid>
    </MainContent>
  );
};

export default SQLFmt;
