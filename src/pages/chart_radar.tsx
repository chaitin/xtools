import MainContent from '@/components/MainContent';
import { Box, MenuItem, Select, Stack, Switch, TextField } from '@mui/material';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

type ECharts = ReturnType<typeof echarts.init>;
const shapeOptions = [
  { label: '多边形', value: 'polygon' },
  { label: '圆形', value: 'circle' },
];

const _C = () => {
  const domWrapRef = useRef<HTMLDivElement>(null!);
  const echartRef = useRef<ECharts>(null!);
  const [title, setTitle] = useState('展示数据');
  const [legendShow, setLegendShow] = useState(true);
  const [shape, setShape] = useState<'polygon' | 'circle'>('polygon');
  const [inputOptions, setInputOptions] = useState<any>(`[
  { name: 'Sales', max: 6500 },
  { name: 'Administration', max: 16000 },
  { name: 'Information', max: 30000 },
  { name: 'Customer', max: 38000 },
  { name: 'Development', max: 52000 },
  { name: 'Marketing', max: 25000 }
]`);
  const [options, setOptions] = useState<any[]>([]);
  const [inputData, setInputData] = useState<string>(`{
  "测试数据一": [4200, 3000, 20000, 35000, 50000, 18000],
  "测试数据二": [5000, 14000, 28000, 26000, 42000, 21000]
}`);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const option = {
      title: {
        text: title,
      },
      legend: {
        show: legendShow,
        top: 'bottom',
        data: chartData.map((item) => item.name),
      },
      tooltip: {
        show: true,
        trigger: 'item',
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
      radar: {
        indicator: options,
        shape: shape,
      },
      series: [
        {
          name: 'Radius Mode',
          type: 'radar',
          data: chartData,
        },
      ],
    };
    if (domWrapRef.current && echartRef.current) {
      echartRef.current.setOption(option);
    }
  }, [chartData, legendShow, title, options, shape]);

  useEffect(() => {
    if (inputOptions) {
      try {
        const jsData = new Function(`return ${inputOptions}`)();
        const data = JSON.parse(JSON.stringify(jsData, null, 2));
        setOptions(data);
      } catch (error) {
        console.log(String(error));
      }
    }
  }, [inputOptions]);

  useEffect(() => {
    if (inputData) {
      try {
        const jsData = new Function(`return ${inputData}`)();
        const data = JSON.parse(JSON.stringify(jsData, null, 2));
        const chart = Object.keys(data).map((key) => ({
          name: key,
          value: data[key],
          label: {
            show: true,
            formatter: function (params: any) {
              return params.value;
            },
          },
        }));
        setChartData(chart);
      } catch (error) {
        console.log(String(error));
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
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Box sx={{ fontWeight: 'bold' }}>标题</Box>
            <TextField
              sx={{
                input: {
                  width: '200px',
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
          <Stack direction='row' alignItems='center' spacing={2}>
            <Box sx={{ fontWeight: 'bold' }}>形状</Box>
            <Select
              sx={{ width: '200px', '.MuiSelect-select': { p: '6px 10px' } }}
              size='small'
              value={shape}
              onChange={(event) =>
                setShape(event.target.value as 'polygon' | 'circle')
              }
            >
              {shapeOptions.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Box sx={{ fontWeight: 'bold' }}>图例组件</Box>
            <Switch
              checked={legendShow}
              onChange={(event) => setLegendShow(event.target.checked)}
            />
          </Stack>
        </Stack>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Box sx={{ fontWeight: 'bold' }}>维度</Box>
          <Box sx={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '12px' }}>
            [name: 坐标轴名称 max: 坐标轴最大值]
          </Box>
        </Stack>
        <AceEditor
          name='ace-editor'
          fontSize={14}
          style={{
            width: '100%',
            borderRadius: '4px',
            height: '200px',
          }}
          value={inputOptions}
          mode='javascript'
          theme='monokai'
          onChange={setInputOptions}
          editorProps={{ $blockScrolling: true }}
        />
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Box sx={{ fontWeight: 'bold' }}>数据</Box>
          <Box sx={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '12px' }}>
            按照上方维度顺序填写数据，一个雷达图可以有多组数据
          </Box>
        </Stack>
        <AceEditor
          name='ace-editor'
          fontSize={14}
          style={{
            width: '100%',
            borderRadius: '4px',
            height: '200px',
          }}
          value={inputData}
          mode='json'
          theme='monokai'
          onChange={setInputData}
          editorProps={{ $blockScrolling: true }}
        />
      </Stack>
    </MainContent>
  );
};

export default _C;
