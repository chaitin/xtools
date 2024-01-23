import MainContent from '@/components/MainContent';
import React, { useEffect, useMemo, useState } from 'react';
import { keyframes } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Box,
  Grid,
  List,
  ListItem,
  Stack,
  styled,
  Typography,
  TextField,
  type SxProps,
} from '@mui/material';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

interface TimeResult {
  years: number | string;
  months: number | string;
  days: number | string;
  hours: number | string;
  minutes: number | string;
  seconds: number | string;
}

type TimeKey = keyof TimeResult;

const MyBox = styled(Box)(({ theme }) => ({
  borderRadius: '6px',
  background: '#F7F8FA',
  padding: '12px',
  marginTop: '8px',
}));

const blockFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const LatticeBox = ({ bgcolor, sx }: { bgcolor?: string; sx?: SxProps }) => (
  <Box
    sx={{
      width: '18px',
      height: '18px',
      margin: '3px',
      backgroundColor: bgcolor,
      flexShrink: 0,
      ...sx,
    }}
  />
);

const timeOptions: Array<{ key: TimeKey; label: string }> = [
  { key: 'years', label: '年' },
  { key: 'months', label: '月' },
  { key: 'days', label: '日' },
  { key: 'hours', label: '时' },
  { key: 'minutes', label: '分' },
  { key: 'seconds', label: '秒' },
];

const retireColor = '#f8c039';

const getLattices = (retirementAge: number) => [
  { key: 'past', index: 0, desc: '你已经走过的生命', color: '#98c3b9' },
  {
    key: 'sleep',
    index: 0,
    desc: '如果你平均每天休息 8 小时，这是你余下生命里睡眠占用的时间',
    color: '#c1e8f9',
  },
  {
    key: 'work',
    index: 0,
    desc: `如果你 ${retirementAge} 岁退休，退休前每周工作 5 天，平均每天工作 8 小时，这是你余下生命里工作占用的时间`,
    color: '#ab9f93',
  },
  {
    key: 'retire',
    index: 324,
    desc: `${retirementAge} 岁，你退休了`,
    color: retireColor,
  },
  {
    key: 'accompany_children',
    index: 0,
    desc: '如果你 28 岁生孩子，孩子 18 岁出门上大学，这 18 年里你平均每天能花 5 个小时陪伴孩子，这里是你余下生命里所用去的时间',
    color: '#e3a6ab',
  },
  {
    key: 'accompany_parents',
    index: 0,
    desc: '如果你每个月能看望父母一天，在他们 80 岁前，这是你的余生里还能陪伴他们的时光',
    color: '#7ea1b7',
  },
  {
    key: 'remain',
    index: 0,
    desc: '除了以上之外，你剩下的所有日子',
    color: '#e2e2e2',
  },
];

const LifeCount = () => {
  const [birthDate, setBirthDate] = useState<string>('');
  const [retirementAge, setRetirementAge] = useState<number>(60);

  const [pastTime, setPastTime] = useState<TimeResult | null>(null);
  const [remainingTime, setRemainingTime] = useState<TimeResult | null>(null);
  const [latticeResult, setLatticeResult] = useState<any>({
    blockArr: [],
    length: {},
  });

  const lattices = useMemo(() => {
    return getLattices(retirementAge);
  }, [retirementAge]);

  const retireIndex = useMemo(() => {
    return retirementAge * 5 - 1;
  }, [retirementAge]);

  useEffect(() => {
    const calculateTime = () => {
      if (birthDate) {
        const now = dayjs();
        const birth = dayjs(birthDate);

        setPastTime({
          years: now.diff(birth, 'year', true).toFixed(1),
          months: now.diff(birth, 'month', true).toFixed(1),
          days: now.diff(birth, 'day', true).toFixed(1),
          hours: now.diff(birth, 'hour', true).toFixed(1),
          minutes: now.diff(birth, 'minute', true).toFixed(1),
          seconds: now.diff(birth, 'second').toFixed(1),
        });

        const lifetime = birth.add(80, 'year');
        setRemainingTime({
          years: lifetime.diff(now, 'year', true).toFixed(1),
          months: lifetime.diff(now, 'month', true).toFixed(1),
          days: lifetime.diff(now, 'day', true).toFixed(1),
          hours: lifetime.diff(now, 'hour', true).toFixed(1),
          minutes: lifetime.diff(now, 'minute', true).toFixed(1),
          seconds: lifetime.diff(now, 'second').toFixed(1),
        });
      }
    };
    calculateTime();

    let timer: NodeJS.Timer | undefined = undefined;
    if (birthDate) {
      timer = setInterval(calculateTime, 1000);
    }

    return () => clearInterval(timer);
  }, [birthDate]);

  useEffect(() => {
    if (!birthDate || !retirementAge) {
      return;
    }
    const calcLatticeCount = () => {
      const oneBlockDays = 73; // 一个方块代表的天数，365 / (400 / 80)
      const oneBlockHours = 24 * 73; // 一个方块代表的小时
      const haveChildren = 28; // 生孩子的年龄

      const now = dayjs();
      const birth = dayjs(birthDate);

      // 计算已经过去时间的方块数
      const pastDays = now.diff(birth, 'day');
      const past = Math.round(pastDays / oneBlockDays);

      // 计算剩余时间里，睡觉时间的方块数
      const lifetime = birth.add(80, 'year');
      const sleep = Math.round((lifetime.diff(now, 'day') * 8) / oneBlockHours);

      // 计算剩余时间里，工作时间的方块数
      const workYear = birth.add(retirementAge, 'year').diff(now, 'year', true); // 距离退休年龄还能工作的年数
      const work = Math.round((((workYear * 365 * 5) / 7) * 8) / oneBlockHours);

      // 计算剩余时间里，陪伴孩子的时间的方块数
      const accompany_children_days = birth
        .add(haveChildren + 18, 'year')
        .diff(now, 'day'); // 距离孩子18岁需要陪伴的天数
      const accompany_children =
        accompany_children_days <= 0
          ? 0
          : Math.round((5 * accompany_children_days) / oneBlockHours);

      // 计算剩余时间里，陪伴父母的时间的方块数
      const accompany_parents_days = birth
        .add(80 - haveChildren, 'year')
        .diff(now, 'day', true); // 距离父母80岁需要陪伴的天数
      const accompany_parents =
        accompany_parents_days <= 0
          ? 0
          : Math.round(((accompany_parents_days / 31) * 24) / oneBlockHours);

      let remain =
        400 - past - sleep - work - accompany_children - accompany_parents;
      if (remain <= 0) remain = 0;

      const result = {
        past,
        sleep,
        work,
        accompany_children,
        accompany_parents,
        remain,
      };

      const blockArr: Array<{ type: string }> = [];
      Object.keys(result).forEach((key) => {
        for (let i = 0; i < result[key as keyof typeof result]; i++) {
          blockArr.push({
            type: key,
          });
        }
      });
      setLatticeResult({
        blockArr,
        length: result,
      });
    };
    calcLatticeCount();
  }, [birthDate, retirementAge]);

  return (
    <MainContent>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box>
              <Typography
                variant='subtitle1'
                mb={1}
                sx={{ fontWeight: 'Bold' }}
              >
                你的出生日期
              </Typography>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale='zh-cn'
              >
                <DatePicker
                  label=''
                  value={birthDate ? dayjs(birthDate) : null}
                  onChange={(value) =>
                    setBirthDate(value ? value.format('YYYY-MM-DD') : '')
                  }
                  minDate={dayjs().subtract(78, 'year')}
                  maxDate={dayjs().subtract(1, 'year')}
                  format='YYYY-MM-DD'
                  views={['year', 'month', 'day']}
                  slotProps={{
                    textField: { variant: 'outlined', size: 'small', name: '' },
                  }}
                  sx={{
                    input: { fontSize: '16px' },
                  }}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography
                variant='subtitle1'
                mb={1}
                sx={{ fontWeight: 'Bold' }}
              >
                退休年龄
                <Typography
                  component='span'
                  sx={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '12px' }}
                >
                  （通常为 60 岁或 55 岁）
                </Typography>
              </Typography>
              <TextField
                sx={{ width: '216px' }}
                type='number'
                size='small'
                variant='outlined'
                value={retirementAge}
                onChange={(e: any) => setRetirementAge(e.target.value)}
                inputProps={{
                  min: 50,
                  max: 65,
                }}
              />
            </Box>
          </Grid>
        </Grid>
        {!!birthDate && !!retirementAge && (
          <>
            <Box mt={2}>
              <Typography variant='subtitle1' sx={{ fontWeight: 'Bold' }}>
                已过去的时间
              </Typography>
              <MyBox>
                <Grid container spacing={2} ml={0}>
                  {timeOptions.map((item) => (
                    <Grid item xs={4} key={item.key}>
                      <Stack direction='row' alignItems='center'>
                        <Typography sx={{ fontSize: '22px', mr: 1 }}>
                          {pastTime?.[item.key]}
                        </Typography>
                        <Typography sx={{ color: '#999999' }}>
                          {item.label}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </MyBox>
            </Box>
            <Box mt={2}>
              <Typography variant='subtitle1' sx={{ fontWeight: 'Bold' }}>
                剩下的时间
              </Typography>
              <MyBox>
                <Grid container spacing={2} ml={0}>
                  {timeOptions.map((item) => (
                    <Grid item xs={4} key={item.key}>
                      <Stack direction='row' alignItems='center'>
                        <Typography sx={{ fontSize: '22px', mr: 1 }}>
                          {remainingTime?.[item.key]}
                        </Typography>
                        <Typography sx={{ color: '#999999' }}>
                          {item.label}
                        </Typography>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </MyBox>
            </Box>
            <Box mt={2}>
              <Typography variant='subtitle1' sx={{ fontWeight: 'Bold' }}>
                你的人生进度
              </Typography>
              <MyBox display='flex' justifyContent='center'>
                <Stack direction='row' flexWrap='wrap' sx={{ width: '480px' }}>
                  {latticeResult.blockArr.map(
                    (item: { type: string }, index: number) => {
                      const lattice = lattices.find(
                        (o) => o.key === item.type
                      )!;
                      return (
                        <LatticeBox
                          key={index}
                          sx={{
                            backgroundColor:
                              index === retireIndex &&
                              index >= latticeResult.length.past
                                ? retireColor
                                : lattice?.color,
                            animation:
                              index === latticeResult.length.past - 1
                                ? `${blockFadeIn} ease 2s infinite`
                                : '',
                          }}
                        />
                      );
                    }
                  )}
                </Stack>
              </MyBox>
            </Box>
          </>
        )}
        <Box mt={2}>
          <Typography variant='subtitle1' sx={{ fontWeight: 'Bold' }}>
            说明
          </Typography>
          <MyBox>
            <ListItem>
              <Typography variant='subtitle2' sx={{ fontSize: '1rem' }}>
                假设我们的寿命是80岁，分为400个方块。
              </Typography>
            </ListItem>
            <List aria-label='contacts' sx={{ py: 0, color: '#2f3e4c' }}>
              {lattices.map((item) => (
                <ListItem key={item.key} alignItems='flex-start'>
                  <LatticeBox bgcolor={item.color} sx={{ mr: 1 }} />
                  {item.desc}
                </ListItem>
              ))}
              <ListItem>
                <Typography>数据仅供娱乐，人生苦短，继续努力吧~</Typography>
              </ListItem>
            </List>
          </MyBox>
        </Box>
      </Box>
    </MainContent>
  );
};

export default LifeCount;
