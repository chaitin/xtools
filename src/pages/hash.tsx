import MainContent from '@/components/MainContent';
import crypto from 'crypto-js';
import React, { useCallback, useMemo, useState } from 'react';
import { Box, Stack, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextFieldWithCopy from '@/components/TextFieldWithCopy';
import TextFieldWithClean from '@/components/TextFieldWithClean';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const Hash: React.FC = () => {
  const methods = useMemo(() => {
    return (val: any) => {
      return [
        {
          name: 'MD5 - 16 位',
          value: crypto.MD5(val).toString().substr(8, 16),
        },
        { name: 'MD5 - 32 位', value: crypto.MD5(val).toString() },
        { name: 'SHA1', value: crypto.SHA1(val).toString() },
        { name: 'SHA224', value: crypto.SHA224(val).toString() },
        { name: 'SHA256', value: crypto.SHA256(val).toString() },
        { name: 'SHA3', value: crypto.SHA3(val).toString() },
        { name: 'SHA384', value: crypto.SHA384(val).toString() },
        { name: 'SHA512', value: crypto.SHA512(val).toString() },
      ];
    };
  }, []);

  const initValue = methods('').map((x) => {
    return { name: x.name, value: '' };
  });

  const [src, setSrc] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const [method, setMethod] = React.useState('encode');
  const [loading, setLoading] = useState<boolean>(false);
  const [values, setValues] = useState(initValue);

  const handleChange = (event: React.SyntheticEvent, method: string) => {
    setMethod(method);
  };

  const handleCleanClick = useCallback(() => {
    setSrc('');
    setValues(initValue);
  }, []);

  let outElements = values.map((x) => {
    return (
      <TextFieldWithCopy
        key={x.name}
        label={x.name}
        size='small'
        value={x.value}
        variant='outlined'
        InputProps={{
          readOnly: true,
        }}
        sx={{ width: '100%', input: { fontSize: '14px', fontFamily: 'Mono' } }}
      />
    );
  });

  const onSrcChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSrc(event.target.value);
      setValues(methods(event.target.value));
    },
    [setValues]
  );

  const handleSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files || [];
      if (files.length == 0) {
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = function (e) {
          if (e.target !== null) {
            const data = crypto.lib.WordArray.create(
              new Uint8Array(e.target.result as ArrayBuffer) as any
            );
            setValues(methods(data));
            setLoading(false);
          }
        };
        setFileName(files[0].name);
        reader.readAsArrayBuffer(files[0]);
      }, 200);
    },
    [setValues]
  );

  return (
    <MainContent>
      <Box>
        <TabContext value={method}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab
                label='文本'
                value='encode'
                sx={{ textTransform: 'none !important' }}
              />
              <Tab
                label='文件'
                value='decode'
                sx={{ textTransform: 'none !important' }}
              />
            </TabList>
          </Box>
          <TabPanel value='encode' sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <TextFieldWithClean
              variant='outlined'
              label='输入'
              value={src}
              onChange={onSrcChange}
              onClean={handleCleanClick}
              rows={3}
              multiline
              sx={{
                width: '100%',
                textarea: { fontSize: '14px', fontFamily: 'Mono' },
              }}
            />
          </TabPanel>
          <TabPanel value='decode' sx={{ paddingLeft: 0, paddingRight: 0 }}>
            <Box sx={{ position: 'relative', alignSelf: 'flex-start' }}>
              <LoadingButton
                loading={loading}
                loadingPosition='start'
                size='small'
                sx={{ borderRadius: '4px', width: '100%' }}
                variant='contained'
                startIcon={<CloudUploadIcon />}
              >
                {!loading
                  ? fileName
                    ? '已选择文件 - ' + fileName
                    : '选择文件'
                  : '正在计算'}
              </LoadingButton>
              <VisuallyHiddenInput
                sx={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  clipPath: 'none',
                  clip: 'unset',
                  opacity: '0',
                  cursor: 'pointer',
                }}
                type='file'
                onChange={handleSelectFile}
              />
            </Box>
          </TabPanel>
        </TabContext>
        <Stack spacing={2}>{outElements}</Stack>
      </Box>
    </MainContent>
  );
};

export default Hash;
