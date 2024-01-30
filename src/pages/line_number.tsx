import alert from '@/components/Alert';
import MainContent from '@/components/MainContent';
import TextFieldWithClean from '@/components/TextFieldWithClean';
import { ToolsForm } from '@/components/Tools';
import { saveFile } from '@/utils/download';
import {
  Button,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const LineNumber: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [initNumber, setInitNumber] = useState<string>('1');
  const [splitStr, setSplitStr] = useState<string>(' ');
  const [outText, setOutText] = useState<string>('');

  const addLineNumber = () => {
    const isNumber = Number.isInteger(+initNumber);
    let _outText = '';
    text.split('\n').forEach((item, index) => {
      const line = `${
        isNumber ? index + Number(initNumber) : initNumber
      }${splitStr}${item}`;
      _outText += line + '\n';
    });
    setOutText(_outText);
  };
  const handleSaveFile = (event: React.MouseEvent<HTMLElement>) => {
    saveFile(outText, '添加行号.txt');
  };
  return (
    <MainContent>
      <ToolsForm sx={{ width: '100%' }}>
        <TextFieldWithClean
          multiline
          maxRows={10}
          minRows={4}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onClean={() => {
            setText('');
            setOutText('');
          }}
          variant='outlined'
        />
        <Stack direction='row' spacing={2} alignItems='center'>
          <OutlinedInput
            required
            size='small'
            type='string'
            value={initNumber}
            startAdornment={
              <Typography
                variant='caption'
                sx={{ color: '#333', fontWeight: 700, fontSize: '14px', pr: 1 }}
              >
                初始行号:
              </Typography>
            }
            onChange={(event) => setInitNumber(event.target.value)}
            sx={{
              width: '145px',
              flexGrow: '0!important',
              whiteSpace: 'nowrap',
            }}
          />
          <OutlinedInput
            required
            size='small'
            type='string'
            value={splitStr}
            startAdornment={
              <Typography
                variant='caption'
                sx={{ color: '#333', fontWeight: 700, fontSize: '14px', pr: 1 }}
              >
                分隔符:
              </Typography>
            }
            onChange={(event) => setSplitStr(event.target.value)}
            sx={{
              width: '145px',
              flexGrow: '0!important',
              whiteSpace: 'nowrap',
            }}
          />
          <Button
            size='small'
            sx={{
              fontSize: '14px',
              width: '90',
              borderRadius: '4px',
              ml: 'auto',
              height: '28px',
            }}
            color='primary'
            variant='contained'
            onClick={addLineNumber}
          >
            添加行号
          </Button>
          <CopyToClipboard
            text={outText}
            onCopy={() => alert.success('复制成功')}
          >
            <Button
              size='small'
              sx={{
                fontSize: '14px',
                width: '90',
                borderRadius: '4px',
                ml: 'auto',
                height: '28px',
              }}
              color='primary'
              variant='contained'
              onClick={addLineNumber}
            >
              复制结果
            </Button>
          </CopyToClipboard>
          <Button
            size='small'
            sx={{
              fontSize: '14px',
              width: '90',
              borderRadius: '4px',
              ml: 'auto',
              height: '28px',
            }}
            color='primary'
            variant='contained'
            onClick={handleSaveFile}
          >
            导出文本
          </Button>
        </Stack>
        <TextField
          multiline
          variant='filled'
          maxRows={10}
          value={outText}
          onChange={() => setOutText('')}
        />
      </ToolsForm>
    </MainContent>
  );
};

export default LineNumber;
