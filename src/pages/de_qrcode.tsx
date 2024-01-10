import alertActions from '@/components/Alert';
import MainContent from '@/components/MainContent';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Stack } from '@mui/material';
import QrcodeParse from 'qrcode-parser';
import Table from 'rc-table';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const _C = () => {
  const [list, setList] = useState<
    { id: number; name: string; url?: string; error?: string }[]
  >([]);

  const columns = [
    {
      title: '图片',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (value: string) => (
        <Box sx={{ wordBreak: 'break-all' }}>{value}</Box>
      ),
    },
    {
      title: '解析值',
      dataIndex: 'url',
      key: 'url',
      render: (value: string, record: any) => (
        <Box
          sx={{
            mr: 2,
            color: record.error ? 'error.main' : 'text.primary',
          }}
        >
          {!record.error ? (
            <CopyToClipboard
              text={value}
              onCopy={() => alertActions.success('复制成功')}
            >
              <Stack
                direction={'row'}
                alignItems={'flex-start'}
                spacing={1}
                sx={{ cursor: 'pointer', ':hover': { color: 'primary.main' } }}
              >
                <Box>{value}</Box>
                <Stack
                  alignItems={'center'}
                  justifyContent={'center'}
                  sx={{ height: '21px' }}
                >
                  <ContentCopyIcon sx={{ fontSize: '12px' }} />
                </Stack>
              </Stack>
            </CopyToClipboard>
          ) : (
            '无法识别出该图片中的二维码内容'
          )}
        </Box>
      ),
    },
  ];

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      QrcodeParse(url)
        .then((res: any) => {
          setList([
            { name: file.name, url: res, id: (Math.random() * 10e8) | 0 },
            ...list,
          ]);
        })
        .catch((err) => {
          setList([
            {
              name: file.name,
              error: String(err),
              id: (Math.random() * 10e8) | 0,
            },
            ...list,
          ]);
        });
    }
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
        <Button
          size='small'
          variant='outlined'
          sx={{ borderRadius: '4px', width: '120px', mb: 2 }}
          onClick={handleClick}
        >
          上传二维码
        </Button>
        <Box
          component={'input'}
          id='fileInput'
          type='file'
          accept='image/*'
          sx={{ display: 'none' }}
          onChange={upload}
        />
        <Table
          columns={columns}
          data={list}
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
      </Box>
    </MainContent>
  );
};

export default _C;
