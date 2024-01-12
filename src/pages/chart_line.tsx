import MainContent from '@/components/MainContent';
import { Box, Stack, Switch, TextField } from '@mui/material';
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-monokai';

type ECharts = ReturnType<typeof echarts.init>;

const _C = () => {
  const domWrapRef = useRef<HTMLDivElement>(null!);
  const echartRef = useRef<ECharts>(null!);
  const [title, setTitle] = useState('展示数据');
  const [legendShow, setLegendShow] = useState(true);
  const [smooth, setSmooth] = useState(false);
  const [inputOptions, setInputOptions] = useState<any>(
    `Mon, Tue, Wed, Thu, Fri, Sat, Sun`
  );
  const [options, setOptions] = useState<any>([]);
  const [inputData, setInputData] = useState<string>(`{
  "测试数据一": [120, 132, 101, 134, 90, 230, 210],
  "测试数据二": [220, 182, 191, 234, 290, 330, 310],
  "测试数据三": [150, 232, 201, 154, 190, 330, 410],
  "测试数据四": [320, 332, 301, 334, 390, 330, 320],
  "测试数据五": [220, 132, 201, 234, 290, 330, 120],
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
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: options,
      },
      yAxis: {
        type: 'value',
      },
      series: chartData.map((it) => ({
        ...it,
        stack: 'Total',
        type: 'line',
        smooth,
        label: {
          show: true,
          formatter: function (params: any) {
            return params.value;
          },
        },
      })),
    };
    if (domWrapRef.current && echartRef.current) {
      echartRef.current.setOption(option);
    }
  }, [chartData, legendShow, title, smooth, options]);

  useEffect(() => {
    if (inputOptions) {
      try {
        const data = inputOptions
          .replace(/，/g, ',')
          .split(',')
          .map((it: string) => it.trim());
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
          data: data[key],
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
            <Box sx={{ fontWeight: 'bold' }}>平滑</Box>
            <Switch
              checked={smooth}
              onChange={(event) => setSmooth(event.target.checked)}
            />
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
          <Box sx={{ fontWeight: 'bold' }}>横坐标</Box>
          <Box sx={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '12px' }}>
            以中文或英文逗号隔开
          </Box>
        </Stack>
        <TextField
          sx={{
            input: {
              width: '100%',
              fontSize: '14px',
              p: '6px 10px',
            },
            'input::placeholder': {
              fontSize: '14px',
            },
          }}
          size='small'
          variant='outlined'
          value={inputOptions}
          onChange={(e: any) => setInputOptions(e.target.value)}
        />
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <Box sx={{ fontWeight: 'bold' }}>数据</Box>
          <Box sx={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: '12px' }}>
            一个折线图可以有多组数据
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
