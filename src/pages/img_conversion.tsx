import alertActions from '@/components/Alert';
import MainContent from '@/components/MainContent';
import { getConversionUrlByImageFile } from '@/utils';
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import Table from 'rc-table';
import { useState } from 'react';

type FileItem = {
  id: number;
  file: File;
  type: string;
  conversion: string;
  size: number;
  url: string;
  loading: boolean;
};

const imgTypes = [
  { label: 'JPG', value: 'image/jpeg', suffix: 'jpeg' },
  { label: 'PNG', value: 'image/png', suffix: 'png' },
  { label: 'GIF', value: 'image/gif', suffix: 'gif' },
  { label: 'WEBP', value: 'image/webp', suffix: 'webp' },
  { label: 'BMP', value: 'image/bmp', suffix: 'bmp' },
  { label: 'ICO', value: 'image/x-icon', suffix: 'ico' },
];

const _C = () => {
  const [fileList, setFileList] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedAll, setSelectedAll] = useState<string>('');

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
      title: '图片大小',
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
                return imgTypes.filter((it) => it.value === selected)[0]?.label;
              return <Box sx={{ color: '#999' }}>选择转换类型</Box>;
            }}
            onChange={(e: SelectChangeEvent<string>) =>
              handleSelect(e.target.value, record.id)
            }
          >
            {imgTypes.map((it) => (
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
            onClick={() => convertItem(record.id)}
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
                  imgTypes.find((it) => it.value === record.conversion)!.suffix
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

  const convert = () => {
    if (fileList.length === 0) {
      alertActions.warning('请先上传文件');
    } else if (!fileList.every((it) => !!it.conversion)) {
      alertActions.warning('请先选择转换类型');
    } else {
      setLoading(true);
      Promise.all(
        fileList.map((item) =>
          getConversionUrlByImageFile(item.file, item.conversion)
        )
      )
        .then((res) => {
          setFileList(
            fileList.map((item, index) => {
              return {
                ...item,
                url: res[index],
                loading: false,
              };
            })
          );
          setLoading(false);
          alertActions.success('转换成功');
        })
        .catch(() => {
          setLoading(false);
          alertActions.error('转换失败');
        });
    }
  };

  const convertItem = async (id: number) => {
    setLoading(true);
    const url = await getConversionUrlByImageFile(
      fileList.find((it) => it.id === id)!.file,
      fileList.find((it) => it.id === id)!.conversion
    );
    setFileList(
      fileList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            url,
            loading: false,
          };
        }
        return item;
      })
    );
    setLoading(false);
    alertActions.success('转换成功');
  };

  return (
    <MainContent>
      <Box
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
        >
          <Stack direction='row' alignItems={'center'} spacing={2}>
            <Button
              sx={{ borderRadius: '4px' }}
              size='small'
              variant='outlined'
              onClick={upload}
            >
              上传图片
            </Button>
            <Box sx={{ color: '#999', fontSize: '12px' }}>
              已上传 {fileList.length} 张图片
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
                return imgTypes.filter((it) => it.value === selected)[0]?.label;
              return <Box sx={{ color: '#999' }}>全部切换类型</Box>;
            }}
            onChange={(e: SelectChangeEvent<string>) => {
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
            }}
          >
            {imgTypes.map((it) => (
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
          accept='image/*'
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
        <Button
          sx={{ mt: 2, borderRadius: '4px', width: '100%' }}
          variant='outlined'
          onClick={convert}
          disabled={loading}
        >
          开始转换
        </Button>
      </Box>
    </MainContent>
  );
};

export default _C;
