import MainContent from '@/components/MainContent';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

const mock =
  '黄焖鸡\r\n牛肉粉\r\n老乡鸡\r\nKFC\r\n牛腩饭\r\n鳗鱼饭\r\n袁记云饺';

const Eatwhat: React.FC = () => {
  const [food, setFoods] = useState<string>('');
  const [output, setEatWhat] = useState<string>('');

  const handleEditorChange = (value: string) => {
    // 将编辑器内容保存到状态
    setFoods(value);
  };

  function splitAndRandomSelect(inputString: string) {
    const lines = inputString.split(/\r?\n/);
    const randomIndex = Math.floor(Math.random() * lines.length);
    const randomLine = lines[randomIndex];

    return randomLine;
  }

  const fmtJson = (s: string) => {
    setFoods(s);
    if (s.length == 0) {
      setEatWhat('');
      return;
    }
    setEatWhat(splitAndRandomSelect(s));
  };

  useEffect(() => {
    setFoods(mock);
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
                  setFoods('');
                  setEatWhat('');
                }}
              >
                <DeleteIcon fontSize='small' color='primary' />
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
            value={food}
            mode='json'
            theme='monokai'
            onChange={handleEditorChange}
            tabSize={2}
          />
          <input
            id='fileInput'
            type='file'
            accept='.json'
            style={{ display: 'none' }}
            // onChange={handleFileChange}
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
              <Button
                variant='contained'
                color='success'
                size='large'
                sx={{
                  height: '30px',
                  borderRadius: '5px',
                  textAlign: 'center',
                }}
                onClick={() => {
                  fmtJson(food);
                }}
              >
                吃啥🍚！
              </Button>
              <Button
                onClick={() => {
                  setEatWhat('');
                }}
              >
                <DeleteIcon fontSize='small' color='primary' />
              </Button>
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
            value={output}
            mode='json'
            theme='monokai'
            onChange={setEatWhat}
            editorProps={{ $blockScrolling: true }}
          />
        </Grid>
      </Grid>
    </MainContent>
  );
};

export default Eatwhat;
