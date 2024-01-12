import MainContent from '@/components/MainContent';
import { Box, Stack, Switch, TextField } from '@mui/material';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

type ECharts = ReturnType<typeof echarts.init>;
type _DataItem = {
  value: number;
  name: string;
};

const _C = () => {
  const domWrapRef = useRef<HTMLDivElement>(null!);
  const echartRef = useRef<ECharts>(null!);
  const [inputData, setInputData] = useState<string>(`{
  "rose 1": 40,
  "rose 2": 38,
  "rose 3": 32,
  "rose 4": 30,
  "rose 5": 28,
  "rose 6": 26,
  "rose 7": 22,
  "rose 8": 18,
  "rose 9": 44,
  "rose 10": 29
}`);
  const [chartData, setChartData] = useState<_DataItem[]>([]);
  const [labelShow, setLabelShow] = useState(true);
  const [legendShow, setLegendShow] = useState(true);
  const [radius, setRadius] = useState([50, 200]);
  const [borderSx, setBorderSx] = useState({
    borderRadius: 10,
    borderColor: '#ffffff',
    borderWidth: 4,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('展示数据');

  useEffect(() => {
    const option = {
      title: {
        text: title,
      },
      legend: {
        show: legendShow,
        top: 'bottom',
      },
      tooltip: {
        show: true,
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
      },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      color: [
        '#5470c6',
        '#91cc75',
        '#fac858',
        '#ee6666',
        '#73c0de',
        '#3ba272',
        '#fc8452',
        '#9a60b4',
        '#ea7ccc',
        '#9e87c6',
      ],
      series: [
        {
          name: 'Radius Mode',
          type: 'pie',
          radius,
          roseType: 'radius',
          itemStyle: {
            ...borderSx,
          },
          label: {
            show: labelShow,
            formatter: '{b}\n{c} ({d}%)',
          },
          data: chartData,
        },
      ],
    };
    if (domWrapRef.current && echartRef.current) {
      echartRef.current.setOption(option);
      setLoading(false);
    }
  }, [chartData, labelShow, radius, borderSx, legendShow, title]);

  useEffect(() => {
    if (inputData) {
      try {
        const jsData = new Function(`return ${inputData}`)();
        const data = JSON.parse(JSON.stringify(jsData, null, 2));
        const chart = Object.keys(data).map((key) => ({
          name: key,
          value: data[key],
        }));
        setLoading(true);
        setChartData(chart);
      } catch (error) {
        setError(String(error));
      }
    }
  }, [inputData]);

  useEffect(() => {
    if (domWrapRef.current) {
      //@ts-ignore
      echartRef.current = echarts.init(domWrapRef.current, null, {
        renderer: 'canvas',
      });

      const resize = () => echartRef.current.resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
  }, []);

  return (
    <MainContent>
      <Stack spacing={2} sx={{ fontSize: '14px' }}>
        <Box
          ref={domWrapRef}
          sx={{
            width: '100%',
            height: '500px',
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
          }}
        />
        <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>配置项</Box>
        <Stack direction='row' spacing={4}>
          <Stack spacing={2} sx={{ width: '50%' }}>
            <AceEditor
              name='ace-editor'
              fontSize={14}
              style={{
                width: '100%',
                borderRadius: '4px',
                height: '100%',
              }}
              value={inputData}
              mode='json'
              theme='monokai'
              onChange={setInputData}
              editorProps={{ $blockScrolling: true }}
            />
          </Stack>
          <Stack spacing={2} sx={{ width: 'calc(50% - 32px)' }}>
            <Stack direction='row' alignItems='center'>
              <Box sx={{ width: '80px', fontWeight: 'bold' }}>标题</Box>
              <TextField
                sx={{
                  flexGrow: 1,
                  input: {
                    fontSize: '14px',
                    p: '6px 10px',
                  },
                  'input::placeholder': {
                    fontSize: '14px',
                  },
                }}
                size='small'
                variant='outlined'
                value={title}
                onChange={(e: any) => setTitle(e.target.value)}
              />
            </Stack>
            <Stack direction='row' alignItems='center'>
              <Box sx={{ width: '80px', fontWeight: 'bold' }}>图例组件</Box>
              <Switch
                checked={legendShow}
                onChange={(event) => setLegendShow(event.target.checked)}
              />
            </Stack>
            <Stack direction='row' alignItems='center'>
              <Box sx={{ width: '80px', fontWeight: 'bold' }}>文本标签</Box>
              <Switch
                checked={labelShow}
                onChange={(event) => setLabelShow(event.target.checked)}
              />
            </Stack>
            <Stack direction='row' alignItems='flex-start'>
              <Box sx={{ width: '80px', fontWeight: 'bold', mt: '7px' }}>
                图形样式
              </Box>
              <Stack spacing={2}>
                <Stack direction='row' alignItems='center'>
                  <Box sx={{ width: '80px' }}>间隙宽度</Box>
                  <TextField
                    sx={{
                      width: '120px',
                      input: {
                        p: '6px 10px',
                      },
                      'input::placeholder': {
                        fontSize: '14px',
                      },
                    }}
                    size='small'
                    type='number'
                    variant='outlined'
                    value={borderSx.borderWidth}
                    onChange={(e: any) =>
                      setBorderSx({ ...borderSx, borderWidth: e.target.value })
                    }
                  />
                </Stack>
                <Stack direction='row' alignItems='center'>
                  <Box sx={{ width: '80px' }}>间隙颜色</Box>
                  <TextField
                    sx={{
                      width: '120px',
                      input: {
                        p: '8px 10px',
                      },
                      'input::placeholder': {
                        fontSize: '14px',
                      },
                    }}
                    size='small'
                    type='color'
                    variant='outlined'
                    value={borderSx.borderColor}
                    onChange={(e: any) =>
                      setBorderSx({ ...borderSx, borderColor: e.target.value })
                    }
                  />
                </Stack>
                <Stack direction='row' alignItems='center'>
                  <Box sx={{ width: '80px' }}>花瓣圆角</Box>
                  <TextField
                    sx={{
                      width: '120px',
                      input: {
                        p: '6px 10px',
                      },
                      'input::placeholder': {
                        fontSize: '14px',
                      },
                    }}
                    size='small'
                    type='number'
                    variant='outlined'
                    value={borderSx.borderRadius}
                    onChange={(e: any) =>
                      setBorderSx({ ...borderSx, borderRadius: e.target.value })
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </MainContent>
  );
};

export default _C;
