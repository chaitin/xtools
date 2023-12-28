import MainContent from '@/components/MainContent';
import alert from '@/components/Alert';
import { Box, OutlinedInput } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyToClipboard from 'react-copy-to-clipboard';

function addSpaceBetweenChineseAndEnglish(inputStr: string) {
  const result = inputStr
    .replace(
      /([\u4e00-\u9fa5，。！？；：·（）「」【】‘“’”《》])([a-zA-Z,.!?;:`\(\)\{\}\[\]'"<>0-9])/g,
      '$1 $2'
    )
    .replace(
      /([a-zA-Z,.!?;:`\(\)\{\}\[\]'"<>0-9])([\u4e00-\u9fa5，。！？；：·（）「」【】‘“’”《》])/g,
      '$1 $2'
    );

  return result;
}

const _C = () => {
  const [input, setInput] =
    useState<string>(`你好世界1234你好世界ACVs你好世界`);
  const [translate, setTranslate] = useState<string>('');

  const handleClick = useCallback(() => {
    alert.success('复制成功');
  }, []);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    var value = event.target.value;
    setInput(value);
  };

  useEffect(() => {
    setTranslate(addSpaceBetweenChineseAndEnglish(input));
  }, [input]);

  return (
    <MainContent>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          justifyContent: 'center',
          minHeight: '500px',
          maxHeight: 'calc(100vh - 287px)',
        }}
      >
        <Box sx={{ width: '402px' }}>
          <OutlinedInput
            sx={{
              width: '100%',
              height: '100%',
              fontFamily: 'Mono',
              textarea: { height: '100% !important' },
            }}
            value={input}
            onChange={onChange}
            margin='dense'
            minRows='5'
            maxRows='10'
            multiline
            autoFocus
          />
        </Box>
        <Box
          sx={{
            width: '24px',
            display: 'flex',
            alignItems: 'center',
            mx: 3,
            flexShrink: 0,
            color: '#999',
          }}
        >
          <SwapHorizontalCircleIcon />
        </Box>
        <Box
          sx={{
            width: '402px',
            border: '1px solid rgba(0, 0, 0, 0.23)',
            borderRadius: '4px',
            p: '16.5px 14px',
            overflowY: 'hidden',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              pr: 1,
              overflowY: 'auto',
              height: '100%',
              whiteSpace: 'pre-wrap',
            }}
          >
            {translate}
          </Box>
          <CopyToClipboard text={translate} onCopy={handleClick}>
            <ContentCopyIcon
              sx={{
                zIndex: 1,
                position: 'absolute',
                right: '12px',
                top: '14px',
                cursor: 'pointer',
                '& svg': {
                  width: '20px',
                  height: '20px',
                },
              }}
              fontSize='small'
              color='primary'
            />
          </CopyToClipboard>
        </Box>
      </Box>
    </MainContent>
  );
};

export default _C;
