import MainContent from '@/components/MainContent';
import TextFieldWithClean from '@/components/TextFieldWithClean';
import TextFieldWithCopy from '@/components/TextFieldWithCopy';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Box, Tab } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';

const URLEncoder: React.FC = () => {
  const [method, setMethod] = React.useState('encode');
  const [input, setInput] = useState<string>('');
  const [output, setOutput] = useState<string>('');

  const funcMap = useMemo(() => {
    const m = new Map<String, Function>();
    m.set('encode', encodeURIComponent);
    m.set('decode', decodeURIComponent);
    return m;
  }, []);

  const handleChange = (event: React.SyntheticEvent, method: string) => {
    const newInput = output;
    setInput(newInput);
    setMethod(method);
    var fn = funcMap.get(method);
    if (fn) {
      try {
        setOutput(fn(newInput));
      } catch (e) {
        setOutput('输入有误, 解码失败');
      }
    }
  };

  const handleInputChanged = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      var value = event.target.value;
      setInput(value);
      var fn = funcMap.get(method);
      if (fn) {
        try {
          setOutput(fn(value));
        } catch (e) {
          setOutput('输入有误, 解码失败');
        }
      }
    },
    [funcMap, method]
  );

  const handleCleanClick = useCallback(() => {
    setInput('');
    setOutput('');
  }, []);

  return (
    <MainContent>
      <>
        <TabContext value={method}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab
                label='编码'
                value='encode'
                sx={{ textTransform: 'none !important' }}
              />
              <Tab
                label='解码'
                value='decode'
                sx={{ textTransform: 'none !important' }}
              />
            </TabList>
          </Box>
        </TabContext>
        <TextFieldWithClean
          variant='outlined'
          label='输入'
          value={input}
          onChange={handleInputChanged}
          onClean={handleCleanClick}
          minRows='5'
          maxRows='10'
          size='small'
          multiline
          sx={{
            width: '100%',
            textarea: { fontFamily: 'Mono' },
          }}
        />
        <TextFieldWithCopy
          variant='outlined'
          label='输出'
          value={output}
          minRows='5'
          maxRows='10'
          size='small'
          multiline
          InputProps={{
            readOnly: true,
          }}
          sx={{
            width: '100%',
            textarea: { fontFamily: 'Mono' },
          }}
        />
      </>
    </MainContent>
  );
};

export default URLEncoder;
