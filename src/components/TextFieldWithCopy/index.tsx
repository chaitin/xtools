import { Box, TextField, OutlinedTextFieldProps } from '@mui/material';
import React, { useCallback } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import alert from '@/components/Alert';

const TextFieldWithCopy: React.FC<OutlinedTextFieldProps> = (props) => {
  const { ...otherProps } = props;

  const handleCopyClick = useCallback(() => {
    alert.success('已复制到剪切板');
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <TextField {...otherProps} variant='outlined' />
      <Box
        sx={{
          position: 'absolute',
          width: '30px',
          height: '30px',
          right: '4px',
          top: '4px',
          paddingTop: '6px',
          textAlign: 'center',
          bgcolor: 'rgba(0,0,0,0.1)',
          display: otherProps.value ? '' : 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          color: '#fff',
          '&:hover': {
            bgcolor: 'rgba(0,0,0,0.25)',
          },
        }}
      >
        <CopyToClipboard
          text={otherProps.value as string}
          onCopy={handleCopyClick}
        >
          <ContentCopyIcon fontSize='small' />
        </CopyToClipboard>
      </Box>
    </Box>
  );
};

export default TextFieldWithCopy;
