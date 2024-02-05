import alertActions from '@/components/Alert';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import Table from 'rc-table';
import { useEffect, useRef, useState } from 'react';

type FileItem = {
  id: number;
  file: File;
  type: string;
  conversion: string;
  size: number;
  url: string;
  loading: boolean;
};

const audioTypes = [
  { label: 'AAC', value: 'audio/aac', suffix: 'aac' },
  { label: 'OGA', value: 'audio/ogg', suffix: 'oga' },
  { label: 'WAV', value: 'audio/wav', suffix: 'wav' },
  { label: 'MP3', value: 'audio/mpeg', suffix: 'mp3' },
];

const _C = () => {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAll, setSelectedAll] = useState<string>('');

  const ffmpegRef = useRef(new FFmpeg());
  const historyRef = useRef<HTMLDivElement | null>(null);
  const messageRef = useRef<HTMLDivElement | null>(null);

  const getFmtUrlByFile = async (file: File, conversion: string) => {
    try {
      const ffmpeg = ffmpegRef.current;
      const outputName =
        file.name.split('.')[0] +
        '.' +
        audioTypes.find((it) => it.value === conversion)?.suffix;
      await ffmpeg.writeFile(file.name, await fetchFile(file));

      if (historyRef.current)
        historyRef.current.innerHTML = `${historyRef.current.innerHTML}<div>${file.name} ===> ${outputName}</div>`;

      await ffmpeg.exec(['-i', file.name, outputName]);

      const data = await ffmpeg.readFile(outputName);
      const url = URL.createObjectURL(new Blob([data], { type: conversion }));

      ffmpeg.deleteFile(file.name);
      ffmpeg.deleteFile(outputName);

      if (historyRef.current)
        historyRef.current.innerHTML = `${historyRef.current.innerHTML}<div style="color: green">Successful conversion</div>`;

      return url;
    } catch (error) {
      if (historyRef.current)
        historyRef.current.innerHTML = `${historyRef.current.innerHTML}<div style="color: red">${error}</div>`;

      return Promise.reject(error);
    } finally {
      if (messageRef.current) messageRef.current.innerHTML = '';
      setLoading(false);
    }
  };

  const formatFileSize = (size: number): string => {
    if (size === 0) {
      return '0 B';
    } else {
      const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const digitGroups = Math.floor(Math.log10(size) / Math.log10(1024));
      return `${(size / Math.pow(1024, digitGroups)).toFixed(2)} ${
        units[digitGroups]
      }`;
    }
  };

  const handleSelect = (v: string, id: number) => {
    setSelectedAll('');
    setFileList(
      fileList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            url: '',
            loading: false,
            conversion: v,
          };
        }
        return item;
      })
    );
  };

  const columns = [
    {
      title: '文件名',
      dataIndex: 'file',
      key: 'file',
      render: (value: File) => <Box>{value.name}</Box>,
    },
    {
      title: '音频大小',
      dataIndex: 'size',
      key: 'size',
      width: 150,
      render: (value: number) => <Box>{formatFileSize(value)}</Box>,
    },
    {
      title: '转换',
      dataIndex: 'conversion',
      key: 'conversion',
      width: 200,
      render: (value: string, record: FileItem) => (
        <Box>
          <Select
            size='small'
            displayEmpty
            sx={{ width: '150px', height: '30px', fontSize: '14px' }}
            value={value}
            MenuProps={{
              sx: {
                maxHeight: '500px',
              },
            }}
            renderValue={(selected: string) => {
              if (selected)
                return audioTypes.filter((it) => it.value === selected)[0]
                  ?.label;
              return <Box sx={{ color: '#999' }}>选择转换类型</Box>;
            }}
            onChange={(e: SelectChangeEvent<string>) => {
              if (!loading) {
                handleSelect(e.target.value, record.id);
              } else {
                alertActions.warning('等待转换完成');
              }
            }}
          >
            {audioTypes.map((it) => (
              <MenuItem value={it.value} key={it.value}>
                {it.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      ),
    },
    {
      title: '操作',
      dataIndex: 'setting',
      key: 'setting',
      width: 150,
      render: (value: string, record: FileItem) => (
        <Stack direction='row'>
          <Button
            size='small'
            color='primary'
            sx={{ borderRadius: '4px', minWidth: 'auto' }}
            disabled={loading || record.loading || !record.conversion}
            onClick={() => convertItem(record)}
          >
            转换
          </Button>
          <Button
            size='small'
            color='primary'
            disabled={loading || record.loading || !record.url}
            sx={{ borderRadius: '4px', minWidth: 'auto' }}
            onClick={() =>
              download(
                record.url,
                record.file.name.split('.')[0] +
                  '.' +
                  audioTypes.find((it) => it.value === record.conversion)!
                    .suffix
              )
            }
          >
            下载
          </Button>
          <Button
            size='small'
            color='error'
            disabled={loading || record.loading}
            sx={{ borderRadius: '4px', minWidth: 'auto' }}
            onClick={() => {
              setFileList(fileList.filter((item) => item.id !== record.id));
              alertActions.success('移除成功');
            }}
          >
            移除
          </Button>
        </Stack>
      ),
    },
  ];

  const download = (url: string, fileName: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const upload = () => {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  };

  const saveFile = (event: any) => {
    const files = event.target.files;
    const newFiles = [...files].map((file) => {
      return {
        id: (Math.random() * 10e8) | 0,
        file,
        type: file.type,
        size: file.size,
        conversion: '',
        url: '',
        loading: false,
      };
    });
    setFileList([...fileList, ...newFiles]);
  };

  // const convert = async () => {
  //   if (fileList.length === 0) {
  //     alertActions.warning('请先上传文件');
  //   } else if (!fileList.every((it) => !!it.conversion)) {
  //     alertActions.warning('请先选择转换类型');
  //   } else {
  //     setLoading(true);
  //     const list = fileList.map(async (item) => {
  //       if (item.url) return { ...item, loading: false };
  //       try {
  //         const url = await getFmtUrlByFile(item.file, item.conversion);
  //         return { ...item, url, loading: false }
  //       } catch (error) {
  //         return { ...item, loading: false }
  //       }
  //     })
  //     setFileList(await Promise.all(list));
  //     setLoading(false);
  //     if (messageRef.current) messageRef.current.innerHTML = '';
  //   }
  // };

  const convertItem = async (item: FileItem) => {
    if (item.url) return;
    setLoading(true);
    const url = await getFmtUrlByFile(item.file, item.conversion);
    setFileList(
      fileList.map((it) => {
        if (it.id === item.id) {
          return { ...it, url, loading: false };
        }
        return it;
      })
    );
  };

  const loadPlugin = async () => {
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    const ffmpeg = ffmpegRef.current;
    ffmpeg.on('log', ({ message }) => {
      if (messageRef.current) messageRef.current.innerHTML = message;
    });
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
    });
  };

  useEffect(() => {
    loadPlugin();
  }, []);

  return (
    <Stack
      spacing={2}
      sx={{
        '.rc-table': {
          border: '1px solid #eee',
          borderRadius: '4px',
        },
        '.rc-table table': {
          width: '100%',
          borderCollapse: 'collapse',
        },
        '.rc-table-thead .rc-table-cell': {
          textAlign: 'left',
          paddingLeft: '24px',
          backgroundColor: '#eee',
          fontSize: '12px',
          height: '28px',
          fontWeight: 500,
          fontFamily: 'Mono',
        },
        '.rc-table-tbody .rc-table-row': {
          borderBottom: '1px solid #eee',
        },
        '.rc-table-tbody .rc-table-cell': {
          paddingLeft: '24px',
          fontSize: '14px',
          paddingTop: '12px',
          paddingBottom: '12px',
          fontFamily: 'Mono',
        },
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        sx={{ mb: 2 }}
      >
        <Stack direction='row' alignItems={'center'} spacing={2}>
          <Button
            sx={{ borderRadius: '4px' }}
            size='small'
            variant='outlined'
            onClick={upload}
          >
            上传音频
          </Button>
          <Box sx={{ color: '#999', fontSize: '12px' }}>
            已上传 {fileList.length} 个音频
          </Box>
        </Stack>
        <Select
          size='small'
          displayEmpty
          sx={{ width: '150px', height: '30px', fontSize: '14px' }}
          value={selectedAll}
          MenuProps={{
            sx: {
              maxHeight: '500px',
            },
          }}
          renderValue={(selected: string) => {
            if (selected)
              return audioTypes.filter((it) => it.value === selected)[0]?.label;
            return <Box sx={{ color: '#999' }}>全部切换类型</Box>;
          }}
          onChange={(e: SelectChangeEvent<string>) => {
            if (!loading) {
              setSelectedAll(e.target.value);
              setFileList(
                fileList.map((item) => {
                  return {
                    ...item,
                    loading: false,
                    url: '',
                    conversion: e.target.value,
                  };
                })
              );
            } else {
              alertActions.warning('等待转换完成');
            }
          }}
        >
          {audioTypes.map((it) => (
            <MenuItem value={it.value} key={it.value}>
              {it.label}
            </MenuItem>
          ))}
        </Select>
      </Stack>
      <Box
        component={'input'}
        id='fileInput'
        multiple
        type='file'
        accept='audio/*'
        style={{ display: 'none' }}
        onChange={saveFile}
      />
      <Table
        columns={columns}
        data={fileList}
        rowKey='id'
        emptyText={
          <Box
            sx={{
              textAlign: 'center',
              color: '#999',
              fontSize: '12px',
            }}
          >
            暂无数据
          </Box>
        }
      />
      <Box
        sx={{
          fontSize: '12px',
          bgcolor: 'rgba(0,0,0,0.05)',
          py: 1,
          px: 2,
          color: '#999',
          borderRadius: '4px',
        }}
      >
        <Box ref={historyRef}></Box>
        <Box ref={messageRef}>Upload audio and convert audio format</Box>
      </Box>
    </Stack>
  );
};

export default _C;
