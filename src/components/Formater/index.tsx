import alert from '@/components/Alert';
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import AceEditor from 'react-ace';
import xmlFormat from 'xml-formatter';
import * as prettier from 'prettier/standalone';
import babelPlugin from 'prettier/plugins/babel';
import yamlPlugin from 'prettier/plugins/yaml';
import htmlPlugin from 'prettier/plugins/html';
import cssPlugin from 'prettier/plugins/postcss';
import tsPlugin from 'prettier/plugins/typescript';
import estree from 'prettier/plugins/estree';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

export enum Mode {
  CSS = 'css',
  JavaScript = 'javascript',
  TypeScript = 'typescript',
  HTML = 'html',
  YAML = 'yaml',
  XML = 'xml',
  JSON = 'json',
}

interface FormaterProps {
  mock: string;
  mode: Mode;
  accept: string;
}

const Formater: React.FC<FormaterProps> = ({ mock, mode, accept }) => {
  const [cnt, setCnt] = useState<string>('');
  const [fcnt, setFmtCnt] = useState<string>('');
  const [indent, setIndent] = useState<number>(2);

  const handleCopy = useCallback(() => {
    alert.success('复制成功');
  }, []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        format(content, indent);
      };
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const getFileExt = () => {
    switch (mode) {
      case Mode.CSS:
        return '.css';
      case Mode.JavaScript:
        return '.js';
      case Mode.TypeScript:
        return '.ts';
      case Mode.HTML:
        return '.html';
      case Mode.YAML:
        return '.yaml';
      case Mode.XML:
        return '.xml';
      case Mode.JSON:
        return '.json';
    }
  };

  const downloadFile = () => {
    const blob = new Blob([fcnt]);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const t = new Date().getTime();
    link.download = t.toString() + getFileExt();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getParser = () => {
    switch (mode) {
      case Mode.CSS:
        return 'css';
      case Mode.JavaScript:
        return 'babel';
      case Mode.TypeScript:
        return 'typescript';
      case Mode.HTML:
        return 'html';
      case Mode.YAML:
        return 'yaml';
    }
  };

  const getPlugin = () => {
    switch (mode) {
      case Mode.CSS:
        return [cssPlugin];
      case Mode.JavaScript:
        return [babelPlugin, estree];
      case Mode.TypeScript:
        return [tsPlugin, estree];
      case Mode.HTML:
        return [htmlPlugin];
      case Mode.YAML:
        return [yamlPlugin];
    }
  };

  const format = (s: string, indent: number) => {
    setCnt(s);
    if (s.length == 0) {
      setFmtCnt('');
      return;
    }

    try {
      switch (mode) {
        case Mode.XML:
          const fmt = xmlFormat(s, {
            indentation: ' '.repeat(indent),
          });
          setFmtCnt(fmt);
          break;

        case Mode.JSON:
          let a = JSON.parse(s);
          setFmtCnt(JSON.stringify(a, null, indent));
          break;

        default:
          prettier
            .format(s, {
              parser: getParser(),
              plugins: getPlugin(),
              tabWidth: indent,
              embeddedLanguageFormatting: 'auto',
              endOfLine: 'auto',
            })
            .then((s) => {
              setFmtCnt(s);
            });
      }
    } catch (error) {
      setFmtCnt('无效的内容');
    }
  };

  useEffect(() => {
    format(mock, 2);
  }, []);

  return (
    <Grid
      sx={{
        mt: '24px',
        maxWidth: '1020px',
        height: '100%',
        '#input *': {
          fontFamily: 'Mono',
        },
        '#output *': {
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
                setCnt('');
                setFmtCnt('');
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
          name='input'
          fontSize={16}
          style={{
            width: '100%',
            borderRadius: '4px',
            height: 'calc(100vh - 345px)',
            fontFamily: 'Mono',
          }}
          value={cnt}
          mode={mode.toString()}
          theme='monokai'
          onChange={(s) => {
            format(s, indent);
          }}
          tabSize={2}
        />
        <input
          id='fileInput'
          type='file'
          accept={accept}
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
            <FormControl variant='standard' sx={{ minWidth: 20 }}>
              <Select
                id='indent-input'
                value={indent}
                onChange={(e) => {
                  const indent =
                    typeof e.target.value === 'number' ? e.target.value : 2;
                  setIndent(indent);
                  format(cnt, indent);
                }}
                label='缩进'
              >
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={8}>8</MenuItem>
              </Select>
            </FormControl>

            <Button onClick={downloadFile}>
              <DownloadIcon fontSize='small' color='primary' />
            </Button>

            <CopyToClipboard text={fcnt} onCopy={handleCopy}>
              <Button>
                <ContentCopyIcon fontSize='small' color='primary' />
              </Button>
            </CopyToClipboard>
          </Box>
        </Box>

        <AceEditor
          name='output'
          fontSize={16}
          style={{
            width: '100%',
            borderRadius: '4px',
            height: 'calc(100vh - 345px)',
            fontFamily: 'Mono',
          }}
          value={fcnt}
          mode={mode.toString()}
          theme='monokai'
          onChange={setFmtCnt}
          editorProps={{ $blockScrolling: true }}
        />
      </Grid>
    </Grid>
  );
};

export default Formater;
