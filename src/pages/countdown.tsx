import MainContent from '@/components/MainContent';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import { Box, Button, Stack, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const options: {
  label: string;
  value: number;
  render: [boolean, boolean, boolean, boolean];
}[] = [
  { label: '1 分钟', value: 60, render: [false, false, true, true] },
  { label: '2 分钟', value: 120, render: [false, false, true, true] },
  { label: '3 分钟', value: 180, render: [false, false, true, true] },
  { label: '4 分钟', value: 240, render: [false, false, true, true] },
  { label: '5 分钟', value: 300, render: [false, false, true, true] },
  { label: '10 分钟', value: 600, render: [false, false, true, true] },
  { label: '15 分钟', value: 900, render: [false, false, true, true] },
  { label: '20 分钟', value: 1200, render: [false, false, true, true] },
  { label: '25 分钟', value: 1500, render: [false, false, true, true] },
  { label: '30 分钟', value: 1800, render: [false, false, true, true] },
  { label: '1 小时', value: 3600, render: [false, true, true, true] },
  { label: '2 小时', value: 7200, render: [false, true, true, true] },
  { label: '4 小时', value: 14400, render: [false, true, true, true] },
  { label: '8 小时', value: 28800, render: [false, true, true, true] },
  { label: '12 小时', value: 43200, render: [false, true, true, true] },
  { label: '1 天', value: 86400, render: [true, true, true, true] },
  { label: '2 天', value: 172800, render: [true, true, true, true] },
  { label: '3 天', value: 259200, render: [true, true, true, true] },
  { label: '4 天', value: 345600, render: [true, true, true, true] },
  { label: '5 天', value: 432000, render: [true, true, true, true] },
];

const _C = () => {
  // const flipRef = useRef<HTMLDivElement>()
  const [cur, setCur] = useState<Date>();
  const [endTime, setEndTime] = useState<Date | number | string>(
    new Date().getTime()
  );
  const [renderMap, setRenderMap] = useState<
    [boolean, boolean, boolean, boolean]
  >([false, false, true, true]);
  const [custom, setCustom] = useState([0, 0, 0, 0]);

  // const run = () => {
  // }
  // const stop = () => {
  // }

  const submit = () => {
    setEndTime(
      new Date().getTime() +
        (custom[0] * 60 * 60 * 24 +
          custom[1] * 60 * 60 +
          custom[2] * 60 +
          custom[3]) *
          1000
    );
    setRenderMap([custom[0] > 0, custom[0] > 0 || custom[1] > 0, true, true]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCur(new Date());
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <MainContent>
      <Stack alignItems={'center'}>
        {!!endTime && (
          <FlipClockCountdown
            to={endTime}
            // ref={flipRef}
            labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
            renderMap={renderMap}
            hideOnComplete={false}
            labelStyle={{
              fontSize: 10,
              fontWeight: 500,
              textTransform: 'uppercase',
              color: '#000',
            }}
            separatorStyle={{ color: '#000' }}
            onComplete={() => console.log('Completed!')}
            onTick={({ timeDelta, completed }) =>
              console.log(timeDelta, completed)
            }
          />
        )}
        {/* <Stack direction={'row'} justifyContent={'center'} sx={{ mt: 2 }} spacing={2}>
        <Button variant="contained" sx={{ borderRadius: '4px' }} onClick={run}>启动</Button>
        <Button variant="outlined" sx={{ borderRadius: '4px' }} onClick={stop}>暂停</Button>
      </Stack> */}
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ mt: 8, fontSize: '14px', color: 'rgba(0,0,0,0.5)' }}
          spacing={1}
        >
          <Box>自定义：</Box>
          <TextField
            sx={{
              width: '60px',
              input: {
                p: '6px 10px',
              },
            }}
            size='small'
            type='number'
            variant='outlined'
            value={custom[0]}
            onChange={(e: any) => {
              setCustom([e.target.value, custom[1], custom[2], custom[3]]);
            }}
          />
          <Box>天</Box>
          <TextField
            sx={{
              width: '60px',
              input: {
                p: '6px 10px',
              },
            }}
            size='small'
            type='number'
            variant='outlined'
            value={custom[1]}
            onChange={(e: any) => {
              let v = Number(e.target.value);
              if (!isNaN(v)) {
                v = v > 23 ? 23 : v;
                v = v < 0 ? 0 : v;
              }
              setCustom([custom[0], v, custom[2], custom[3]]);
            }}
          />
          <Box>小时</Box>
          <TextField
            sx={{
              width: '60px',
              input: {
                p: '6px 10px',
              },
            }}
            size='small'
            type='number'
            variant='outlined'
            value={custom[2]}
            onChange={(e: any) => {
              let v = Number(e.target.value);
              if (!isNaN(v)) {
                v = v > 59 ? 59 : v;
                v = v < 0 ? 0 : v;
              }
              setCustom([custom[0], custom[1], v, custom[3]]);
            }}
          />
          <Box>分钟</Box>
          <TextField
            sx={{
              width: '60px',
              input: {
                p: '6px 10px',
              },
            }}
            size='small'
            type='number'
            variant='outlined'
            value={custom[3]}
            onChange={(e: any) => {
              let v = Number(e.target.value);
              if (!isNaN(v)) {
                v = v > 59 ? 59 : v;
                v = v < 0 ? 0 : v;
              }
              setCustom([custom[0], custom[1], custom[2], v]);
            }}
          />
          <Box>秒</Box>
        </Stack>
        <Button
          variant='outlined'
          size='small'
          sx={{ borderRadius: '4px', mt: 2 }}
          onClick={submit}
        >
          确认倒计时
        </Button>
        <Stack
          direction={'row'}
          justifyContent={'center'}
          flexWrap={'wrap'}
          sx={{ mt: 4, width: '500px' }}
        >
          {options.map((item, index) => {
            return (
              <Box key={index} sx={{ width: '100px', textAlign: 'center' }}>
                <Button
                  size='small'
                  onClick={() => {
                    setEndTime(new Date().getTime() + item.value * 1000);
                    setRenderMap(item.render);
                  }}
                >
                  {item.label}
                </Button>
              </Box>
            );
          })}
        </Stack>
        <Box sx={{ mt: 4, fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>
          建议不要离开浏览器或将浏览器切换到后台运行
        </Box>
        {!!cur && (
          <Box sx={{ mt: 4, fontSize: '12px', color: 'rgba(0,0,0,0.5)' }}>
            {dayjs(cur).format('YYYY-MM-DD HH:mm:ss')}
          </Box>
        )}
      </Stack>
    </MainContent>
  );
};

export default _C;
