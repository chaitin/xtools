import alert from '@/components/Alert';
import MenuView from '@/components/MenuView';
import { ToolsForm } from '@/components/Tools';
import { grayBg2 } from '@/constant';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  OutlinedInput,
  Stack,
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const character = [
  { value: '0123456789', name: 'number', label: '数字(0-9)' },
  {
    value: 'abcdefghijklmnopqrstuvwxyz',
    name: 'lowcase_letters',
    label: '小写字母(a-z)',
  },
  {
    value: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    name: 'upcase_letters',
    label: '大写字母(A-Z)',
  },
  { value: '~!@#$%^&*()_+', name: 'symbols', label: '常用符号(~!@#$%^&*()_+)' },
];
const generateOne = (charset: string, lenfrom: number, lento: number) => {
  var result = '';
  if (lenfrom <= lento && charset.length > 0 && lenfrom >= 0) {
    var len = Math.round(Math.random() * (lento - lenfrom) + lenfrom);
    while (result.length < len) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  return result;
};

const Random: React.FC = () => {
  const [password, setPassword] = useState<string>('');
  const [pwdLength, setPwdLength] = useState<number>(12);
  const [charset, setCharset] = useState<{ [key: string]: boolean }>({
    number: true,
    lowcase_letters: true,
  });
  const [charsetStr, setCharsetStr] = useState<string>(
    character[0].value + character[1].value
  );
  const [count, setCount] = useState<number>(1);

  const charsetCheckChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCharset({
        ...charset,
        [event.target.name]: event.target.checked,
      });
    },
    [charset]
  );
  useEffect(() => {
    setCharsetStr(
      character
        .filter((item) => charset[item.name])
        .map((item) => item.value)
        .join('')
    );
  }, [charset]);

  const changePwdLength = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPwdLength(event.target.valueAsNumber);
    },
    []
  );

  const changeCount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCount(event.target.valueAsNumber);
    },
    []
  );

  const generatePwd = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      let pwd = [];
      for (let i = 0; i < count; i++) {
        pwd.push(generateOne(charsetStr, pwdLength, pwdLength));
      }
      setPassword(pwd.join('\n'));
    },
    [charsetStr, count, pwdLength]
  );

  const handleClick = useCallback(() => {
    alert.success('复制密码成功');
  }, []);

  return (
    <MenuView>
      <Stack sx={{ mx: '0' }}>
        <ToolsForm sx={{ mx: '0' }}>
          <form onSubmit={generatePwd}>
            <Stack sx={{ mt: '30px', gap: '18px' }}>
              <FormControl variant='outlined'>
                <Stack direction='row'>
                  <InputLabel>随机数/密码长度</InputLabel>
                  <Stack>
                    <OutlinedInput
                      required
                      type='number'
                      value={pwdLength}
                      onChange={changePwdLength}
                      margin='dense'
                      sx={{ maxWidth: '215px' }}
                      inputProps={{
                        max: 999,
                        min: 1,
                      }}
                    />
                  </Stack>
                </Stack>
              </FormControl>
              <FormControl variant='outlined'>
                <Stack direction='row'>
                  <InputLabel>使用字符集</InputLabel>
                  <OutlinedInput
                    required
                    value={charsetStr}
                    onChange={(e) => {
                      setCharsetStr(e.target.value);
                    }}
                  />
                </Stack>
                <Box sx={{ pl: '155px', mt: 1 }}>
                  <FormGroup
                    sx={{ background: grayBg2, pl: 2, pt: 1, pb: 1 }}
                    onChange={charsetCheckChange}
                  >
                    {character.map((item) => (
                      <FormControlLabel
                        sx={{ '& span': { fontSize: '14px' } }}
                        key={item.name}
                        name={item.name}
                        control={
                          <Checkbox
                            size='small'
                            checked={Boolean(charset[item.name])}
                          />
                        }
                        label={item.label}
                      />
                    ))}
                  </FormGroup>
                </Box>
              </FormControl>
              <FormControl variant='outlined'>
                <Stack direction='row'>
                  <InputLabel>生成数量</InputLabel>
                  <OutlinedInput
                    required
                    type='number'
                    inputProps={{
                      max: 999,
                      min: 1,
                    }}
                    value={count}
                    onChange={changeCount}
                    sx={{ maxWidth: '215px' }}
                  />
                </Stack>
              </FormControl>
              <Box sx={{ pl: '157px' }}>
                <Button
                  size='small'
                  sx={{
                    fontSize: '14px',
                    maxWidth: '100px',
                    pl: 2,
                    pr: 2,
                    pt: 1,
                    pb: 1,
                    borderRadius: '4px',
                  }}
                  color='primary'
                  variant='contained'
                  type='submit'
                >
                  立即生成
                </Button>
              </Box>
            </Stack>
          </form>
          {!!password ? (
            <Box sx={{ pl: '157px', position: 'relative' }}>
              <SyntaxHighlighter
                language={'text'}
                style={anOldHope}
                customStyle={{ paddingRight: '24px' }}
                showLineNumbers
              >
                {password || ''}
              </SyntaxHighlighter>
              <CopyToClipboard text={password} onCopy={handleClick}>
                <ContentCopyIcon
                  color='primary'
                  sx={{
                    position: 'absolute',
                    right: '6px',
                    top: '6px',
                    cursor: 'pointer',
                    '& svg': {
                      width: '20px',
                      height: '20px',
                    },
                  }}
                  fontSize='small'
                />
              </CopyToClipboard>
            </Box>
          ) : null}
        </ToolsForm>
      </Stack>
    </MenuView>
  );
};

export default Random;
