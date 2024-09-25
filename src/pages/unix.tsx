import sunglasses from '@/asset/tools/sunglasses.png';
import alert from '@/components/Alert';
import MainContent from '@/components/MainContent';
import {
  SecondUnitBtn,
  ToolsForm,
  UnixInputWrap,
  UnixStartBtn,
} from '@/components/Tools';
import { primary } from '@/constant';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone'; // 导入时区插件
import utc from 'dayjs/plugin/utc'; // 导入 UTC 插件
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { anOldHope } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// 使用时区和 UTC 插件
dayjs.extend(timezone);
dayjs.extend(utc);

const initUnix = (isSecond = true) =>
  parseInt('' + Number(new Date()) / (isSecond ? 1000 : 1));

const allTimeZones = [
  { name: '[亚洲] 日本/东京 - Asia/Tokyo', value: 'Asia/Tokyo' },
  { name: '[亚洲] 中国/上海 - Asia/Shanghai', value: 'Asia/Shanghai' },
  { name: '[亚洲] 新加坡 - Asia/Singapore', value: 'Asia/Singapore' },
  { name: '[亚洲] 泰国/曼谷 - Asia/Bangkok', value: 'Asia/Bangkok' },
  { name: '[亚洲] 印度/斯里兰卡/科伦坡 - Asia/Colombo', value: 'Asia/Colombo' },
  { name: '[亚洲] 阿富汗/喀布尔 - Asia/Kabul', value: 'Asia/Kabul' },
  { name: '[亚洲] 阿联/迪拜 - Asia/Dubai', value: 'Asia/Dubai' },
  { name: '[亚洲] 伊拉克/巴格达 - Asia/Baghdad', value: 'Asia/Baghdad' },
  { name: '[非洲] 肯尼亚/内罗毕 - Africa/Nairobi', value: 'Africa/Nairobi' },
  { name: '[非洲] 埃及/开罗 - Africa/Cairo', value: 'Africa/Cairo' },
  { name: '[非洲] 尼日利亚/拉各斯 - Africa/Lagos', value: 'Africa/Lagos' },
  { name: '[欧洲] 俄罗斯/莫斯科 - Europe/Moscow', value: 'Europe/Moscow' },
  {
    name: '[欧洲] 土耳其/伊斯坦布尔 - Europe/Istanbul',
    value: 'Europe/Istanbul',
  },
  {
    name: '[欧洲] 罗马尼亚/布加勒斯 - Europe/Bucharest',
    value: 'Europe/Bucharest',
  },
  { name: '[欧洲] 法国/巴黎 - Europe/Paris', value: 'Europe/Paris' },
  { name: '[欧洲] 德国/柏林 - Europe/Berlin', value: 'Europe/Berlin' },
  { name: '[欧洲] 英国/伦敦 - Europe/London', value: 'Europe/London' },
  { name: '[欧洲] 爱尔兰/都柏林 - Europe/Dublin', value: 'Europe/Dublin' },
  { name: '[美洲] 美国/纽约 - America/New_York', value: 'America/New_York' },
  { name: '[美洲] 美国/盐湖城 - America/Boise', value: 'America/Boise' },
  {
    name: '[美洲] 美国/洛杉矶 - America/Los_Angeles',
    value: 'America/Los_Angeles',
  },
  {
    name: '[美洲] 加拿大/温哥华 - America/Vancouver',
    value: 'America/Vancouver',
  },
  {
    name: '[美洲] 加拿大/温尼伯 - America/Winnipeg',
    value: 'America/Winnipeg',
  },
  { name: '[美洲] 加拿大/多伦多 - America/Toronto', value: 'America/Toronto' },
  {
    name: '[美洲] 巴西/圣保罗 - America/Sao_Paulo',
    value: 'America/Sao_Paulo',
  },
  { name: '[美洲] 秘鲁/利马 - America/Lima', value: 'America/Lima' },
  {
    name: '[美洲] 墨西哥/墨西哥城 - America/Mexico_City',
    value: 'America/Mexico_City',
  },
  {
    name: '[大洋洲] 新西兰/奥克兰 - Pacific/Auckland',
    value: 'Pacific/Auckland',
  },
  {
    name: '[大洋洲] 澳大利亚/悉尼 - Australia/Sydney',
    value: 'Australia/Sydney',
  },
];
const lang = [
  {
    lang: 'rust',
    name: 'Rust',
    code: `use std::time::{SystemTime, UNIX_EPOCH};

fn main() {
  match SystemTime::now().duration_since(UNIX_EPOCH) {
    Ok(n) => {
      let unix_timestamp = n.as_secs();
      println!("current UNIX timestamp: {}", unix_timestamp);
    },
    Err(_) => panic!("SystemTime before UNIX EPOCH!"),
  }
}`,
  },
  {
    lang: 'java',
    name: 'Java',
    code: `import java.time.Instant;

public class Main {
  public static void main(String[] args) {
    long timestamp = Instant.now().getEpochSecond();
    System.out.println("Current timestamp: " + timestamp);
  }
}`,
  },
  {
    lang: 'javascript',
    name: 'JavaScript',
    code: `let timestamp = Math.floor(Date.now() / 1000);\nconsole.log(timestamp);`,
  },
  { lang: 'sql', name: 'MySQL', code: `SELECT UNIX_TIMESTAMP();` },
  {
    lang: 'php',
    name: 'PHP',
    code: `<?php
  $currentTimestamp = time();
  echo $currentTimestamp;
?>`,
  },
  {
    lang: 'python',
    name: 'Python',
    code: `import time
  
timestamp = time.time()
print(timestamp)`,
  },
  {
    lang: 'go',
    name: 'Go',
    code: `package main

import (
  "fmt"
  "time"
)

func main() {
  timestamp := time.Now().Unix()
  fmt.Println(timestamp)
}`,
  },
  {
    lang: 'dos',
    name: 'Ruby',
    code: `timestamp = Time.now.to_i
puts timestamp`,
  },
  {
    lang: 'bash',
    name: 'Unix/Linux',
    code: `#!/bin/bash

timestamp=$(date +%s)
echo $timestamp`,
  },
  {
    lang: 'csharp',
    name: 'C#',
    code: `using System;

class TimestampExample {    
  static void Main() {        
    long timestamp = DateTimeOffset.Now.ToUnixTimeSeconds();        
    Console.WriteLine("Timestamp: " + timestamp);    
  }
}`,
  },
];
enum Unit {
  second = 'second',
  millisecond = 'millisecond',
}
const Unix: React.FC = () => {
  const [currentUnix, setCurrentUnix] = useState<number>(initUnix());
  const [intervalCode, setIntervalCode] = useState<number>(0);
  const [inputUnit, setInputUnit] = useState<Unit>(Unit.second);
  const [outUnit, setOutUnit] = useState<Unit>(Unit.second);
  const [inputUnix, setInputUnix] = useState<number>(initUnix());
  const [outTime, setOutTime] = useState<string>('');
  const [inputTime, setInputTime] = useState<string>(
    new Date().toLocaleString().replace(/,/g, '')
  );
  const [outUnix, setOutUnix] = useState<number>();
  const [code, setCode] = useState<string>('Rust');
  const [timeZone, setTimeZone] = useState<string>('Asia/Shanghai');

  const clearTime = () => {
    clearTimeout(intervalCode);
    setIntervalCode(0);
  };
  const startInterval = () => {
    clearTimeout(intervalCode);
    const time = setInterval(() => {
      setCurrentUnix(inputUnit === Unit.second ? initUnix() : initUnix(false));
    }, 1000);
    setIntervalCode(time as any);
  };
  const synchUnix = useCallback(() => {
    setInputUnix(currentUnix);
  }, [currentUnix]);

  const selectUnit = useCallback(() => {
    setInputUnit(inputUnit === Unit.second ? Unit.millisecond : Unit.second);
  }, [inputUnit]);
  const handelSetUnixInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputUnix(event.target.valueAsNumber);
    },
    []
  );
  const handelTransUnixInput = useCallback(() => {
    console.log(
      'timeZone',
      timeZone,
      'inputUnix',
      inputUnix * (inputUnit === Unit.second ? 1000 : 1)
    );
    setOutTime(
      new Date(inputUnix * (inputUnit === Unit.second ? 1000 : 1))
        .toLocaleString('chinese', { timeZone: timeZone })
        .replace(/,/g, '')
    );
  }, [inputUnit, inputUnix, timeZone]);
  const handelSetOutTime = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOutTime(event.target.value);
    },
    []
  );
  useEffect(() => {
    startInterval();
    return clearTime;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputUnit]);

  const selectOutUnit = useCallback(() => {
    setOutUnit(outUnit === Unit.second ? Unit.millisecond : Unit.second);
  }, [outUnit]);
  const handelSetTimeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputTime(event.target.value);
    },
    []
  );
  const handelTransTimeInput = useCallback(() => {
    const zonedDateTime = dayjs.tz(inputTime, timeZone);
    const unix =
      Number(zonedDateTime.valueOf()) / (outUnit === 'second' ? 1000 : 1);
    setOutUnix(unix);
  }, [outUnit, inputTime, timeZone]);
  const handelSetOutUnix = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOutUnix(event.target.valueAsNumber);
    },
    []
  );
  useEffect(() => {
    if (outUnix) {
      if (outUnit === Unit.second) setOutUnix(parseInt('' + outUnix / 1000));
      else setOutUnix(outUnix * 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [outUnit]);

  const checkCode = useCallback(
    (event: React.FormEvent<HTMLFormElement & SubmitEvent>) => {
      event.stopPropagation();
      event.preventDefault();
      setCode((event.nativeEvent as any).submitter.name);
    },
    []
  );
  const handleClick = useCallback(() => {
    alert.success('复制成功');
  }, []);
  const currentCode = useMemo(
    () => lang.find((item) => item.name === code),
    [code]
  );

  return (
    <MainContent>
      <>
        <ToolsForm
          sx={{
            '& .MuiButton-contained:hover': {
              backgroundColor: 'rgba(52, 90, 255, 0.2)',
            },
          }}
        >
          <Stack
            sx={{
              mx: 'auto',
              mt: '24px',
              gap: '18px',
              fontFamily: 'PingFangSC',
            }}
          >
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
              sx={{
                '& .MuiOutlinedInput-root': { width: '415px', flexGrow: 0 },
              }}
            >
              <InputLabel sx={{ width: '200px!important' }}>
                请选择时区
              </InputLabel>
              <Select
                value={timeZone}
                label='时区'
                onChange={(event) => {
                  setTimeZone(event.target.value);
                }}
              >
                {allTimeZones.map((item) => (
                  <MenuItem value={item.value} key={item.name}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            <Stack direction={'row'} sx={{ alignItems: 'center', pb: 1 }}>
              <Typography
                onClick={synchUnix}
                color='primary'
                variant='body2'
                sx={{
                  cursor: 'pointer',
                  width: '180px',
                  pl: 0,
                  justifyContent: 'flex-start',
                }}
              >
                <time suppressHydrationWarning>{currentUnix}</time>
              </Typography>
              {intervalCode ? (
                <UnixStartBtn
                  direction='row'
                  onClick={clearTime}
                  sx={{ color: '#FF1844' }}
                  color='primary'
                >
                  <PauseIcon fontSize='small' sx={{ mr: 1 }} />
                  停止
                </UnixStartBtn>
              ) : (
                <UnixStartBtn
                  direction='row'
                  onClick={startInterval}
                  sx={{ color: primary }}
                >
                  <PlayArrowIcon fontSize='small' sx={{ mr: 1 }} />
                  开始
                </UnixStartBtn>
              )}
              <Stack direction={'row'} sx={{ color: primary }}>
                <Typography
                  sx={{ width: '180px' }}
                  variant='body2'
                ></Typography>
              </Stack>
            </Stack>
            <UnixInputWrap direction={'row'}>
              <Stack direction={'row'} spacing={1} sx={{ color: '#FF1844' }}>
                <OutlinedInput
                  type='number'
                  value={inputUnix}
                  onChange={handelSetUnixInput}
                  margin='dense'
                  sx={{ width: '300px' }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <SecondUnitBtn color='primary' onClick={selectUnit}>
                        {inputUnit === Unit.second ? '秒' : '毫秒'}
                      </SecondUnitBtn>
                    </InputAdornment>
                  }
                />
                <Button
                  size='small'
                  sx={{
                    borderRadius: '4px',
                    color: primary,
                    background: 'rgba(52, 90, 255, 0.05)',
                  }}
                  component='label'
                  variant='contained'
                  color='primary'
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={handelTransUnixInput}
                >
                  转换
                </Button>
                <OutlinedInput
                  value={outTime}
                  onChange={handelSetOutTime}
                  margin='dense'
                  sx={{ width: '300px' }}
                  endAdornment={
                    <InputAdornment position='end'>{timeZone}</InputAdornment>
                  }
                />
              </Stack>
            </UnixInputWrap>
            <UnixInputWrap direction={'row'}>
              <Stack direction={'row'} spacing={1} sx={{ color: '#FF1844' }}>
                <OutlinedInput
                  value={inputTime}
                  onChange={handelSetTimeInput}
                  margin='dense'
                  sx={{ width: '300px' }}
                  endAdornment={
                    <InputAdornment position='end'>{timeZone}</InputAdornment>
                  }
                />
                <Button
                  size='small'
                  sx={{
                    borderRadius: '4px',
                    color: primary,
                    background: 'rgba(52, 90, 255, 0.05)',
                  }}
                  component='label'
                  variant='contained'
                  color='primary'
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={handelTransTimeInput}
                >
                  转换
                </Button>
                <OutlinedInput
                  type='number'
                  value={outUnix}
                  onChange={handelSetOutUnix}
                  margin='dense'
                  sx={{ width: '300px' }}
                  endAdornment={
                    <InputAdornment position='end'>
                      <SecondUnitBtn onClick={selectOutUnit} color='primary'>
                        {outUnit === Unit.second ? '秒' : '毫秒'}
                      </SecondUnitBtn>
                    </InputAdornment>
                  }
                />
                <CopyToClipboard text={outUnix + ''} onCopy={handleClick}>
                  <ContentCopyIcon
                    sx={{
                      position: 'relative',
                      ml: 1,
                      top: '5px',
                      cursor: 'pointer',
                      '& svg': {
                        width: '20px',
                        height: '20px',
                      },
                    }}
                    fontSize='small'
                    color='primary'
                  />
                </CopyToClipboard>
              </Stack>
            </UnixInputWrap>
          </Stack>
        </ToolsForm>
        <Divider sx={{ my: 4 }}></Divider>
        <Stack
          sx={{
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '80px',
              background: '#F7F8FA',
              borderRadius: '4px',
            }}
          >
            <Grid container spacing={1}>
              <Grid item>
                <Image width={80} alt='complex' src={sunglasses} />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction='column' spacing={2}>
                  <Grid item>
                    <Typography
                      gutterBottom
                      variant='body2'
                      sx={{ fontWeight: 600, pt: 2 }}
                      component='div'
                    >
                      灵感一刻
                    </Typography>
                  </Grid>
                  <Grid item xs sx={{ pt: '4px!important' }}>
                    <Typography
                      sx={{ color: 'rgba(0, 0, 0, 0.50)' }}
                      variant='caption'
                    >
                      在不同的编程语言中如何获取当前 Unix 时间戳？
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Stack direction={'row'} sx={{ my: 2 }} className='unix'>
            <form onSubmit={checkCode}>
              {lang.map((item) => (
                <Button
                  key={item.name}
                  sx={{ fontFamily: 'Mono', textTransform: 'none' }}
                  color={item.name === code ? 'primary' : 'inherit'}
                  name={item.name}
                  type='submit'
                  variant='text'
                >
                  {item.name}
                </Button>
              ))}
            </form>
          </Stack>
          <Box
            sx={{
              position: 'relative',
              '& pre': { minHeight: '120px' },
              '& *': { fontFamily: 'Mono' },
            }}
          >
            <SyntaxHighlighter
              language={currentCode?.lang}
              style={anOldHope}
              showLineNumbers
            >
              {currentCode?.code ?? ''}
            </SyntaxHighlighter>
            <CopyToClipboard
              text={currentCode?.code ?? ''}
              onCopy={handleClick}
            >
              <ContentCopyIcon
                sx={{
                  zIndex: 1,
                  position: 'absolute',
                  right: '6px',
                  top: '16px',
                  cursor: 'pointer',
                  '& svg': {
                    width: '20px',
                    height: '20px',
                  },
                }}
                fontSize='small'
                color='primary'
              />
            </CopyToClipboard>
          </Box>
        </Stack>
      </>
    </MainContent>
  );
};

export default Unix;
