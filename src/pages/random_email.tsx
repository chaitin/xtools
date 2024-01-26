import alert from '@/components/Alert';
import MainContent from '@/components/MainContent';
import { ToolsForm } from '@/components/Tools';
import { grayBg2 } from '@/constant';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
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
];
const generateOne = (charset: string, lenfrom: number, lento: number) => {
  let result = '';
  if (lenfrom <= lento && charset.length > 0 && lenfrom >= 0) {
    const len = Math.round(Math.random() * (lento - lenfrom) + lenfrom);
    while (result.length < len) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
  }
  return result;
};

const Random: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [minLength, setMinLength] = useState<number>(8);
  const [maxLength, setMaxLength] = useState<number>(16);
  const [suffix, setSuffix] = useState<string>('gmail.com');
  const [count, setCount] = useState<number>(10);
  const [charset, setCharset] = useState<{ [key: string]: boolean | string }>({
    number: true,
    lowcase_letters: true,
    upcase_letters: false,
    symbols: false,
    symbols_value: '',
  });

  const handleCharsetCheckChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const type = event.target.type;
      setCharset({
        ...charset,
        [event.target.name]:
          type === 'checkbox' ? event.target.checked : event.target.value,
      });
    },
    [charset]
  );

  const charsetStr = useMemo(() => {
    const str = character
      .filter((item) => charset[item.name])
      .map((item) => item.value)
      .join('');
    return charset.symbols ? str + charset.symbols_value : str;
  }, [charset]);

  const changeMinLength = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMinLength(event.target.valueAsNumber);
    },
    []
  );

  const changeMaxLength = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setMaxLength(event.target.valueAsNumber);
    },
    []
  );

  const changeCount = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCount(event.target.valueAsNumber);
    },
    []
  );

  const changeSuffix = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSuffix(event.target.value);
    },
    []
  );

  const generateEmail = useCallback(
    (event: React.ChangeEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
      if (maxLength < minLength) {
        alert.warning('最大长度小于最小长度');
        return;
      }
      if (!charsetStr) {
        alert.warning('使用字符不足以生成要求数量的邮箱地址');
        return;
      }
      let emails = [];
      for (let i = 0; i < count; i++) {
        emails.push(
          generateOne(charsetStr, minLength, maxLength) + '@' + suffix
        );
      }
      setEmail(emails.join('\n'));
    },
    [charsetStr, count, minLength, maxLength, suffix]
  );

  const handleCopy = useCallback(() => {
    alert.success('复制成功');
  }, []);

  const handleDownload = useCallback(() => {
    const blob = new Blob([email], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'email.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [email]);

  return (
    <MainContent>
      <ToolsForm sx={{ mx: '0' }}>
        <form onSubmit={generateEmail}>
          <Stack sx={{ gap: '18px' }}>
            <FormControl variant='outlined'>
              <Stack direction='row'>
                <InputLabel>邮箱长度范围</InputLabel>
                <Stack direction='row' alignItems='center'>
                  <OutlinedInput
                    required
                    type='number'
                    value={minLength}
                    onChange={changeMinLength}
                    margin='dense'
                    sx={{ width: '100px' }}
                    inputProps={{
                      max: 1000,
                      min: 1,
                    }}
                    placeholder='1-1000'
                  />
                  <Box mx={1}>-</Box>
                  <FormControl>
                    <OutlinedInput
                      required
                      type='number'
                      value={maxLength}
                      onChange={changeMaxLength}
                      margin='dense'
                      sx={{ width: '100px' }}
                      inputProps={{
                        max: 1000,
                        min: 1,
                      }}
                      placeholder='1-1000'
                    />
                  </FormControl>
                  <Typography
                    sx={{
                      color: 'rgba(0, 0, 0, 0.45)',
                      fontSize: '12px',
                      ml: 1,
                    }}
                  >
                    最大长度不能小于最小长度
                  </Typography>
                </Stack>
              </Stack>
            </FormControl>
            <FormControl variant='outlined'>
              <Stack direction='row'>
                <InputLabel>使用字符</InputLabel>
                <FormGroup
                  sx={{
                    background: grayBg2,
                    px: 2,
                    py: 1,
                    alignItems: 'flex-start',
                  }}
                  onChange={handleCharsetCheckChange}
                >
                  <Stack direction='row'>
                    {character.map((item) => (
                      <FormControlLabel
                        sx={{ '& span': { fontSize: '14px' }, ml: 0 }}
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
                  </Stack>
                  <Stack direction='row' alignItems='center'>
                    <FormControlLabel
                      sx={{ '& span': { fontSize: '14px' }, ml: 0 }}
                      name='symbols'
                      control={
                        <Checkbox
                          size='small'
                          checked={Boolean(charset.symbols)}
                        />
                      }
                      label='特殊字符'
                    />
                    {!!charset.symbols && (
                      <FormControlLabel
                        sx={{ '& span': { fontSize: '14px' }, ml: 0 }}
                        name='symbols_value'
                        control={
                          <OutlinedInput
                            value={charset.symbols_value}
                            sx={{ width: '225px', backgroundColor: '#fff' }}
                            placeholder='例如 .-_+'
                          />
                        }
                        label=''
                      />
                    )}
                  </Stack>
                </FormGroup>
              </Stack>
            </FormControl>
            <FormControl variant='outlined'>
              <Stack direction='row'>
                <InputLabel>邮箱后缀</InputLabel>
                <OutlinedInput
                  required
                  value={suffix}
                  onChange={changeSuffix}
                  sx={{ maxWidth: '225px' }}
                  placeholder='例如 gmail.com'
                  startAdornment={
                    <InputAdornment position='start'>@</InputAdornment>
                  }
                />
              </Stack>
            </FormControl>
            <FormControl variant='outlined'>
              <Stack direction='row'>
                <InputLabel>生成数量</InputLabel>
                <OutlinedInput
                  required
                  type='number'
                  fullWidth
                  inputProps={{
                    max: 1000,
                    min: 1,
                  }}
                  value={count}
                  onChange={changeCount}
                  sx={{ maxWidth: '225px' }}
                  placeholder='可填写 1-1000'
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
                生成
              </Button>
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
                  ml: 1,
                }}
                color='primary'
                variant='contained'
                onClick={() => setEmail('')}
              >
                清空
              </Button>
            </Box>
          </Stack>
        </form>
        <Box sx={{ pl: '157px', position: 'relative' }}>
          <SyntaxHighlighter
            language={'text'}
            style={anOldHope}
            customStyle={{ paddingRight: '24px', minHeight: '120px' }}
            showLineNumbers
          >
            {email || ''}
          </SyntaxHighlighter>
          {!!email && (
            <>
              <CopyToClipboard text={email} onCopy={handleCopy}>
                <ContentCopyIcon
                  color='primary'
                  sx={{
                    position: 'absolute',
                    right: '32px',
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
              <DownloadIcon
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
                onClick={handleDownload}
              />
            </>
          )}
        </Box>
      </ToolsForm>
    </MainContent>
  );
};

export default Random;
