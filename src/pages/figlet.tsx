import alert from '@/components/Alert';
import MainContent from '@/components/MainContent';
import { ToolsForm } from '@/components/Tools';
import HelpIcon from '@mui/icons-material/Help';
import {
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import figlet from 'figlet';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import oneRow from 'figlet/importable-fonts/1Row.js';
import threeDAscii from 'figlet/importable-fonts/3D-ASCII';
import ANSIRegular from 'figlet/importable-fonts/ANSI Regular';
import Alligator from 'figlet/importable-fonts/Alligator';
import standard from 'figlet/importable-fonts/Standard.js';
import Wavy from 'figlet/importable-fonts/Wavy';
import Weird from 'figlet/importable-fonts/Weird';
import Whimsy from 'figlet/importable-fonts/Whimsy';
import Wow from 'figlet/importable-fonts/Wow';
import threeDDiagonal from 'figlet/importable-fonts/3D Diagonal';
import Banner from 'figlet/importable-fonts/Banner';
import Block from 'figlet/importable-fonts/Block';
import Bear from 'figlet/importable-fonts/Bear';
import BigMoneyNe from 'figlet/importable-fonts/Big Money-ne';
import DeltaCorpsPriest from 'figlet/importable-fonts/Delta Corps Priest 1';
import Doh from 'figlet/importable-fonts/Doh';

const allFont = [
  { name: '1Row', value: oneRow },
  { name: '3D-ASCII', value: threeDAscii },
  { name: '3D Diagonal', value: threeDDiagonal },
  { name: 'Alligator', value: Alligator },
  { name: 'ANSI Regular', value: ANSIRegular },
  { name: 'Banner', value: Banner },
  { name: 'Block', value: Block },
  { name: 'Bear', value: Bear },
  { name: 'Big Money-ne', value: BigMoneyNe },
  { name: 'Delta Corps Priest 1(只支持英文字母)', value: DeltaCorpsPriest },
  { name: 'Doh', value: Doh },
  { name: 'Standard', value: standard },
  { name: 'Whimsy (只支持英文字母)', value: Whimsy },
  { name: 'Wow', value: Wow },
  { name: 'Weird', value: Weird },
  { name: 'Wavy', value: Wavy },
];
const Figlet = () => {
  const [text, setText] = useState('');
  const [decorateText, setDecorateText] = useState('');
  const [font, setFont] = useState('Standard');
  useEffect(() => {
    allFont.forEach((item) => {
      figlet.parseFont(item.name, item.value);
    });
  }, []);

  const onTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    newFont?: string
  ) => {
    setText(event.target.value);
    figlet(
      event.target.value,
      {
        font: (newFont || font) as any,
        horizontalLayout: 'fitted',
        verticalLayout: 'fitted',
        width: 180,
        whitespaceBreak: true,
      },
      function (err, text) {
        if (err) {
          console.log('something went wrong...');
          console.dir(err);
          return;
        }
        setDecorateText(text || '');
        console.log(text);
        console.log(JSON.stringify(text));
      }
    );
  };
  const handleCopyClick = () => alert.success('已复制到剪切板');
  return (
    <MainContent>
      <ToolsForm sx={{ mx: '0' }}>
        <Stack sx={{ mt: '30px', gap: '18px' }} spacing={2}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <InputLabel sx={{ width: '200px!important' }}>文字</InputLabel>
            <Stack>
              <OutlinedInput
                required
                placeholder='请输入文字'
                value={text}
                onChange={onTextChange}
                margin='dense'
                sx={{ width: '415px' }}
                inputProps={{
                  max: 999,
                  min: 1,
                }}
              />
            </Stack>
          </Stack>
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
            sx={{ '& .MuiOutlinedInput-root': { width: '415px', flexGrow: 0 } }}
          >
            <InputLabel sx={{ width: '200px!important' }}>
              请选择字体
              <Tooltip title='不支持中文，仅支持英文、数字和常规标点符号'>
                <HelpIcon
                  sx={{ fontSize: '14px', color: '#000000', ml: '5px' }}
                />
              </Tooltip>
            </InputLabel>
            <Select
              value={font}
              label='字体'
              onChange={(event) => {
                setFont(event.target.value);
                onTextChange(
                  {
                    target: {
                      value: text,
                    },
                  } as any,
                  event.target.value
                );
              }}
            >
              {allFont.map((item) => (
                <MenuItem value={item.name} key={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>

          <CopyToClipboard text={decorateText} onCopy={handleCopyClick}>
            <pre style={{ cursor: 'pointer' }}>{decorateText}</pre>
          </CopyToClipboard>
          {decorateText && (
            <Typography variant='caption'>
              点击上方文本可复制 figlet 字符串
            </Typography>
          )}
        </Stack>
      </ToolsForm>
    </MainContent>
  );
};

export default Figlet;
